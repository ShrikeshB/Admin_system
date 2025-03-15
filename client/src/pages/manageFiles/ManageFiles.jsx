// page to manage the CSV xls files and upload and distribute the data to agents

import { useEffect, useRef, useState } from "react";
import CsvCard from "../../components/csvCard/CsvCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import icons from "../../iconsLinks";
import axios from "axios";
import "./style/ManageFiles.css";
import { useNavigate } from "react-router-dom";

function ManageFiles() {
  const [file, setFile] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const fileInputRef = useRef(null);

  // handle file upload and distribute data
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("adminId", adminId);

    console.log(file.name);

    try {
      await axios
        .post("http://localhost:3001/api/CSVFiles/uploadCSVFile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
        });

      alert("File uploaded successfully!");
      setFile(null); // Reset file after upload
      fileInputRef.current.value = ""; // Clear input field
      getAllFilesNames();
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  // Fetch all file names
  const [fileNames, setFileNames] = useState([]);
  async function getAllFilesNames() {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/CSVFiles/getCSVFile"
      );
      setFileNames(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/adminlogin"); // Redirect if no token found
    } else {
      getAllFilesNames();
    }
    setAdminId(localStorage.getItem("id"));
  }, [navigate]);

  return (
    <div className="ManageFiles">
      <SideNavBar flag={"ManageFiles"} />
      <div className="page-container">
        {/* Header Section */}
        <header>
          <h1>Dashboard</h1>
          <div className="profile">
            <div className="img-container">
              <img src={icons.profile} alt="Profile" />
            </div>
            <h1>Max</h1>
          </div>
        </header>

        {/* Dashboard Card */}
        <div className="dash-card">
          <img src={icons.user1} alt="User" />
          <div className="left">
            <h3>Total Files</h3>
          </div>
          <div className="right">
            <h1>{fileNames.length}</h1>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="btn-grp">
          <form onSubmit={handleFileUpload}>
            <label htmlFor="file">
              Select File
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                accept=".csv, .xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <button type="submit" className="primary-btn btn">
              Upload & Distribute
            </button>
          </form>
        </div>

        {/* File List Section */}
        <h1 className="header-fs">Files List</h1>
        <div className="list">
          {fileNames.length > 0 ? (
            fileNames.map((val) => <CsvCard key={val._id} data={val} />)
          ) : (
            <p>No files found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageFiles;
