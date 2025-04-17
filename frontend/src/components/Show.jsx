import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowResult = () => {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in!");
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
        console.log(response)
        setHistory(response.data);
      } catch (error) {
        alert("Login plz");
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Previous Upload History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Pic</th>
              <th className="p-3 border">Confidence</th>
              <th className="p-3 border">Severity</th>
              <th className="p-3 border">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No history available
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
