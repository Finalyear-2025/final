import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css"; 

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/17172/17172918.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/10714/10714002.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

function SetViewOnUser({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.latitude, coords.longitude], 13);
    }
  }, [coords, map]);
  return null;
}

const Mapread = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const { t } = useTranslation();

  const fetchLocationAndHospitals = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        try {
          const response = await axios.get("http://127.0.0.1:5000/map", {
            params: { lat: latitude, lon: longitude },
          });
          console.log("Hospitals data from backend:", response.data);
          setHospitals(response.data);
        } catch (error) {
          console.error("Error fetching hospitals:", error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Location access is required to find nearby hospitals.");
        setLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    fetchLocationAndHospitals();
  }, []);

  useEffect(() => {
    if (hospitals.length > 0) {
      console.log("Hospitals data updated:", hospitals);
    } else {
      console.log("No hospitals data available.");
    }
  }, [hospitals]);

  return (
    <div className="container text-center p-5">
      <h2>{t("hospitals_title")}</h2>
      <button
        onClick={fetchLocationAndHospitals}
        className="refresh-button mt-2 mb-4 px-4 py-2 font-bold rounded-lg cursor-pointer"
      >
        🔄 {t("refresh_location") || "Refresh Location"}
      </button>

      <div className="map-container h-[60vh] w-[90%] mx-auto rounded-lg overflow-hidden">
        {loadingLocation ? (
          <div className="spinner mx-auto mt-12 border-6 border-t-6 border-t-blue-500 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
        ) : userLocation ? (
          <MapContainer
            center={[userLocation.latitude, userLocation.longitude]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SetViewOnUser coords={userLocation} />
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={userIcon}
            >
              <Popup>
                <b>{t("your_location")}</b>
              </Popup>
            </Marker>

            {hospitals.length > 0 ? (
              hospitals.map((hospital, index) => {
                const distance = calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  hospital.lat,
                  hospital.lon
                );

                return (
                  <Marker
                    key={index}
                    position={[hospital.lat, hospital.lon]}
                    icon={hospitalIcon}
                  >
                    <Popup>
                      <strong>{hospital.name}</strong>
                      <br />
                      {hospital.address?.street && (
                        <span>
                          📍 {hospital.address.street}
                          <br />
                        </span>
                      )}
                      {hospital.address?.city && (
                        <span>
                          🏙 {hospital.address.city}
                          <br />
                        </span>
                      )}
                      {hospital.details?.phone && (
                        <span>
                          📞 {hospital.details.phone}
                          <br />
                        </span>
                      )}
                      {hospital.details?.speciality && (
                        <span>
                          💉 {hospital.details.speciality}
                          <br />
                        </span>
                      )}
                      <span>
                        📏 {t("distance")}: {distance} km
                        <br />
                      </span>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        🧭 {t("navigate")}
                      </a>
                    </Popup>
                  </Marker>
                );
              })
            ) : (
              <p>{t("no_hospitals_found") || "No hospitals found nearby."}</p>
            )}
          </MapContainer>
        ) : (
          <p>{t("location_failed") || "Unable to fetch location."}</p>
        )}
      </div>
    </div>
  );
};

export default Mapread;
