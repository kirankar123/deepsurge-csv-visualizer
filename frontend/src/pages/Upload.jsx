import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload({ setDashboardData }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Backend response:", res.data);
      setDashboardData(res.data); // ✅ store response globally
      navigate("/dashboard"); // ✅ go to dashboard
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          📂 Upload Your CSV File
        </h2>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload & Analyze
        </button>
      </div>
    </div>
  );
}

export default Upload;
