// manage agent page where list of agent will be displayed and perform CURD operation on agents

import { useEffect, useState } from "react";
import axios from "axios";
import AgentCard from "../../components/agentCard/AgentCard";
import AgentInfoCard from "../../components/agentInfoCard/AgentInfoCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import icons from "../../iconsLinks";
import "./style/Agent.css";
import ListInfoCard from "../../components/listInfoCard/ListInfoCard";
import UpdateAgent from "../../components/updateAgent/UpdateAgent";
import AddNewAgent from "../../components/addNewAgent/AddNewAgent";
import { useNavigate } from "react-router-dom";

function Agents() {
  const [agentsData, setAgentsData] = useState([]);
  const [singleAgentInfo, setSingleAgentInfo] = useState({});
  const [singleListInfo, setsingleListInfo] = useState({});

  // Fetch all agents and searched agents
  const [searchAgent, setSearchAgent] = useState(null);
  async function getAllAgents() {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/agent/getAllAgents/${searchAgent || null}`
      );
      setAgentsData(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

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

  // agent form open close status handler
  const [addAgentForm, setAddAgentForm] = useState(false);
  const addAgentFormStatus = () => {
    setAddAgentForm(!addAgentForm);
    console.log("addAgentForm= " + addAgentForm);
  };

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

  // handle on submit search button
  const handleSearch = (e) => {
    e.preventDefault();
    getAllAgents();
  };

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

  // load agents when user will search for specific agent
  useEffect(() => {
    getAllAgents();
  }, [searchAgent]);

  const navigate = useNavigate();

  // check admin has logged in or not
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/adminlogin"); // Redirect if no token found
    } else {
      getAgentCount();
    }
  }, [navigate]);

  return (
    <div className="Agents">
      <SideNavBar flag="ManageAgents" />

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

      {/* form to add new agent */}
      <AddNewAgent
        addAgentFormStatus={addAgentFormStatus}
        status={addAgentForm}
        getAllAgents={getAllAgents}
      />

      {/* button to open the add agent form which is present in right corner of the website */}
      <button className="agent-btn" onClick={addAgentFormStatus}>
        <img src={icons.add} alt="" />
      </button>

      {/* shows main content on the page */}
      <div className="page-container">
        <header>
          <h1>Dashboard</h1>
          <div className="profile">
            <div className="img-container">
              <img src={icons.profile} alt="Profile" />
            </div>
            <h1>Max</h1>
          </div>
        </header>

        {/* shows total agents  */}
        <div className="dash-card">
          <img src={icons.user1} alt="User" />
          <div className="left">
            <h3>Total Agents</h3>
          </div>
          <div className="right">
            <h1>{agentCount}</h1>
          </div>
        </div>

        <br />
        <h1 className="header-fs">Agents list</h1>

        {/* search box here */}
        <form action="" className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="search agent"
            onChange={(e) => {
              setSearchAgent(e.target.value);
            }}
          />
          <button>
            <img src={icons.search} alt="" />
          </button>
        </form>
        {/* agent list here */}
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
      </div>
    </div>
  );
}

export default Agents;
