import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        withCredentials: true, // Ensure cookies & credentials are sent if needed
      });
      // alert("Upload successful!");
      console.log(res.status);
      if (res.data.message == "File uploaded successfully") {
        setMessage(res.data.message);
      } else {
        setMessage(res.data.message);
      }
    } catch (e) {
      alert("upload failed");
    }
  };
  return (
    <>
      <form className="p-6 max-w-sm mx-auto">
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Age"
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
        Upload
      </button>
      {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
    </form>
    <div>
      <button>Show </button>
    </div>
    </>
  );
};

export default UploadForm;
