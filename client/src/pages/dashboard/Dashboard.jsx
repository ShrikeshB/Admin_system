// dashboard page to know the summary of the data

import { useNavigate } from "react-router-dom";
import AgentCard from "../../components/agentCard/AgentCard";
import CsvCard from "../../components/csvCard/CsvCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import icons from "../../iconsLinks";
import "./style/dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AgentInfoCard from "../../components/agentInfoCard/AgentInfoCard";
import ListInfoCard from "../../components/listInfoCard/ListInfoCard";
import UpdateAgent from "../../components/updateAgent/UpdateAgent";
function Dashboard() {
  const navigate = useNavigate();
  const [agentsData, setAgentsData] = useState([]);
  const [singleAgentInfo, setSingleAgentInfo] = useState({});
  const [singleListInfo, setsingleListInfo] = useState({});

  // Fetch a single agent's info
  const getSingleAgentInfo = async (aid) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/agent/getSingleAgent/${aid}`
      );
      setSingleAgentInfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching single agent:", error);
    }
  };

  // handle agent info card status open or close
  const [openCard, setOpenCard] = useState(false);
  const cardStatus = () => {
    setOpenCard(!openCard);
    console.log(openCard);
  };

  // list details card open close status handler
  const [listCardOpen, setListCardOpen] = useState(false);
  const listCardStatus = () => {
    setListCardOpen(!listCardOpen);
    console.log(listCardOpen);
  };

  // update agent form open close status handler
  const [updateAgentForm, setUpdateAgentForm] = useState(false);
  const updateAgentFormStatus = () => {
    setUpdateAgentForm(!updateAgentForm);
    console.log("updateAgentForm= " + updateAgentForm);
  };

  // get single agent info for updating the agent
  const getSingleAgentInfo_UpdateForm = async (aid) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/agent/getSingleAgent/${aid}`
      );
      setSingleAgentInfo(res.data);
      setUpdateAgentForm(!updateAgentForm);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching single agent:", error);
    }
  };

  // Fetch all agents
  async function getAllAgents() {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/agent/getLimitedAgents"
      );
      setAgentsData(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

  // Fetch all file names
  const [fileNames, setFileNames] = useState([]);
  async function getAllFilesNames() {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/CSVFiles/getLimitedCSVFile"
      );
      setFileNames(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

  // Fetch all agents count
  const [agentCount, setAgentCount] = useState(0);
  async function getAgentCount() {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/agent/getAgentCount"
      );
      setAgentCount(res.data.count); // Extract the 'count' value
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

  // Fetch all files count
  const [filesCount, setFilesCount] = useState(0);
  async function getFilesCount() {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/CSVFiles/getFilesCount"
      );
      setFilesCount(res.data.count); // Extract the 'count' value
    } catch (error) {
      console.error("Error fetching files count:", error);
    }
  }

  // Fetch a single data from list
  const getSingleListInfo = async (lid) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/dataDistribution/getSingleListData/${lid}`
      );
      setsingleListInfo(res.data);
    } catch (error) {
      console.error("Error fetching single agent:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/adminlogin"); // Redirect if no token found
    } else {
      getAllAgents();
      getAgentCount();
      getAllFilesNames();
      getFilesCount();
    }
  }, [navigate]);
  return (
    <div className="Dashboard">
      <SideNavBar flag={"dashboard"} />

      {/* show agent's detaile info */}
      <AgentInfoCard
        data={singleAgentInfo}
        status={openCard}
        cardStatus={cardStatus}
        listCardStatus={listCardStatus}
        getSingleListInfo={getSingleListInfo}
      />

      {/* show list data detailed info */}
      <ListInfoCard
        data={singleListInfo}
        status={listCardOpen}
        listCardStatus={listCardStatus}
      />

      {/* form to update agent details */}
      <UpdateAgent
        data={singleAgentInfo}
        getAllAgents={getAllAgents}
        updateAgentFormStatus={updateAgentFormStatus}
        status={updateAgentForm}
      />

      <div className="page-container">
        <header>
          <h1>Dashboard</h1>
          <div className="profile">
            <div className="img-container">
              <img src={icons.profile} alt="" />
            </div>
            <h1>Max</h1>
          </div>
        </header>
        <div className="card-grp">
          <div className="card">
            <div className="left">
              <img src={icons.user1} alt="" />
              <h3>Total Agents</h3>
            </div>
            <div className="right">
              <h1>{agentCount}</h1>
            </div>
          </div>
          <div className="card">
            <div className="left">
              <img src={icons.doc1} alt="" />
              <h3>Total files</h3>
            </div>
            <div className="right">
              <h1>{filesCount}</h1>
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />
        <br />

        <div className="recent-agents">
          <h1 className="header-fs">Recently Added Agents</h1>
          <div className="list">
            {agentsData.length > 0 ? (
              agentsData.map((val) => (
                <AgentCard
                  key={val._id}
                  data={val}
                  getSingleAgentInfo={getSingleAgentInfo}
                  cardStatus={cardStatus}
                  listCardStatus={listCardStatus}
                  getAllAgents={getAllAgents}
                  updateAgentFormStatus={updateAgentFormStatus}
                  getSingleAgentInfo_UpdateForm={getSingleAgentInfo_UpdateForm}
                />
              ))
            ) : (
              <p>No agents found.</p>
            )}
          </div>
          <center>
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/manageAgents");
              }}
            >
              see more
            </button>
          </center>
        </div>

        <br />
        <br />
        <hr />
        <br />
        <br />

        <div className="recent-csv">
          <h1 className="header-fs">Recently Added files</h1>

          <div className="csv-list">
            {fileNames.length > 0 ? (
              fileNames.map((val) => <CsvCard key={val._id} data={val} />)
            ) : (
              <p>No files found.</p>
            )}
          </div>

          <center>
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/managefiles");
              }}
            >
              see more
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
