import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ShowResult = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const token = localStorage.getItem("token");

    if (!token) {
      alert(t("must_login"));
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(response);
        setHistory(response.data);
      } catch (error) {
        alert(t("must_login"));
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, [t]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{t("upload_history")}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">{t("name")}</th>
              <th className="p-3 border">{t("age")}</th>
              <th className="p-3 border">{t("pic")}</th>
              <th className="p-3 border">{t("cancer_type")}</th>
              <th className="p-3 border">{t("confidence")}</th>
              <th className="p-3 border">{t("severity")}</th>
              <th className="p-3 border">{t("date_time")}</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  {t("no_history")}
                </td>
              </tr>
            ) : (
              history.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="p-3 border">{entry.username}</td>
                  <td className="p-3 border">{entry.age}</td>
                  <td className="p-1 border text-center align-middle">
                    <img
                      src={entry.photo}
                      className="w-40 h-20 object-cover rounded-md inline-block"
                      alt="Upload"
                    />
                  </td>
                  <td className="p-3 border">{entry.prediction}</td>
                  <td className="p-3 border">{entry.confidence}%</td>
                  <td className="p-3 border">{entry.severity}</td>
                  <td className="p-3 border">
                    {entry.date} - {entry.time}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowResult;
