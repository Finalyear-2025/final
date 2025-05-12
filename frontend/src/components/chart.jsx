import React, { useEffect,useRef, useState } from 'react';
import axios from 'axios';

const ChartViewer = () => {
  const [imgSrc, setImgSrc] = useState('');
  const [error, setError] = useState('');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in!");
      window.location.href = "/";
      return;
    }
    axios
      .get('http://localhost:5000/graph',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => { 
        const { image, format } = res.data;
        const src = `data:image/${format};base64,${image}`;
        setImgSrc(src);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load chart');
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        📊 Progress Report
      </h2>

      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {imgSrc ? (
        <img
          src={imgSrc}
          alt="Risk Chart"
          className="max-w-full mx-auto border border-gray-300 rounded-lg hover:scale-105 transition-transform duration-300"
        />
      ) : (
        !error && (
          <p className="text-gray-500 italic">Loading chart...</p>
        )
      )}
    </div>
  );
};

export default ChartViewer;
