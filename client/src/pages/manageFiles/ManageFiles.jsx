import { useRef, useState } from "react";
import CsvCard from "../../components/csvCard/CsvCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import icons from "../../iconsLinks";
import axios from "axios";
import "./style/ManageFiles.css";

function ManageFiles() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div className="ManageFiles">
      <SideNavBar />
      <div className="page-container">
        {/* Header Section */}
        <header>
          <h1>Dashboard</h1>
          <div className="profile">
            <div className="img-container">
              <img src={icons.profile} alt="Profile" />
            </div>
            <h1>Andrew</h1>
          </div>
        </header>

        {/* Dashboard Card */}
        <div className="dash-card">
          <img src={icons.user1} alt="User" />
          <div className="left">
            <h3>Total Files</h3>
          </div>
          <div className="right">
            <h1>100</h1>
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
                accept=".csv"
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
          {[...Array(10)].map((_, index) => (
            <CsvCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageFiles;
