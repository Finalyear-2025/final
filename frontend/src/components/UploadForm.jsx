import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next"; // ✅ Import this

const UploadForm = () => {
  const { t } = useTranslation(); // ✅ Hook

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [predictionData, setPredictionData] = useState(null); // Added state for storing prediction data

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert(t("must_login")); // ✅ translated alert

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.message === "File uploaded successfully") {
        setMessage(t("file_uploaded")); // ✅
        setPredictionData(res.data); // Save the prediction data in state
      } else {
        setMessage(t("upload_failed")); // ✅
      }
    } catch (e) {
      alert(t("upload_failed")); // ✅
    }
  };

  return (
    <div>
      <form className="p-6 max-w-sm mx-auto">
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder={t("name")}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="number"
          placeholder={t("age")}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 w-full"
        >
          {t("upload")}
        </button>
        {message && <p className="mt-2 text-red-600">{message}</p>}
      </form>

      {/* Displaying the prediction result */}
      {predictionData && (
  <div className="p-6 mt-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
    <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">{t("prediction_result")}</h3>
    
    <div className="space-y-4">
      <p className="text-lg"><strong>{t("prediction")}:</strong> {predictionData.prediction}</p>
      <p className="text-lg"><strong>{t("confidence")}:</strong> {predictionData.confidence}</p>
      <p className="text-lg"><strong>{t("severity")}:</strong> {predictionData.severity}</p>
      <p className="text-lg"><strong>{t("severity_level")}:</strong> {predictionData.severity_level}</p>
    </div>

    {/* Displaying the image */}
    <div className="mt-6 text-center">
      <strong>{t("image")}:</strong>
      <div className="mt-4">
        <img 
          src={predictionData.image_url} 
          alt="Uploaded Image" 
          className="w-80 h-80 object-cover rounded-md shadow-lg mx-auto"
        />
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default UploadForm;
