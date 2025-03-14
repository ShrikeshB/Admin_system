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

function Agents() {
  const [agentsData, setAgentsData] = useState([]);
  const [singleAgentInfo, setSingleAgentInfo] = useState({});
  const [singleListInfo, setsingleListInfo] = useState({});

  // Fetch all agents
  async function getAllAgents() {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/agent/getAllAgents"
      );
      setAgentsData(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

  const [openCard, setOpenCard] = useState(false);
  const cardStatus = () => {
    setOpenCard(!openCard);
    console.log(openCard);
  };
  const [listCardOpen, setListCardOpen] = useState(false);
  const listCardStatus = () => {
    setListCardOpen(!listCardOpen);
    console.log(listCardOpen);
  };

  const [updateAgentForm, setUpdateAgentForm] = useState(false);
  const updateAgentFormStatus = () => {
    setUpdateAgentForm(!updateAgentForm);
    console.log("updateAgentForm= " + updateAgentForm);
  };

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

  useEffect(() => {
    getAllAgents();
  }, []); // Runs only on mount

  return (
    <div className="Agents">
      <SideNavBar />
      <AgentInfoCard
        data={singleAgentInfo}
        status={openCard}
        cardStatus={cardStatus}
        listCardStatus={listCardStatus}
        getSingleListInfo={getSingleListInfo}
      />

      <ListInfoCard
        data={singleListInfo}
        status={listCardOpen}
        listCardStatus={listCardStatus}
      />

      <UpdateAgent
        data={singleAgentInfo}
        getAllAgents={getAllAgents}
        updateAgentFormStatus={updateAgentFormStatus}
        status={updateAgentForm}
      />

      <AddNewAgent
        addAgentFormStatus={addAgentFormStatus}
        status={addAgentForm}
        getAllAgents={getAllAgents}
      />

      <button className="agent-btn" onClick={addAgentFormStatus}>
        <img src={icons.add} alt="" />
      </button>

      <div className="page-container">
        <header>
          <h1>Dashboard</h1>
          <div className="profile">
            <div className="img-container">
              <img src={icons.profile} alt="Profile" />
            </div>
            <h1>Andrew</h1>
          </div>
        </header>

        <div className="dash-card">
          <img src={icons.user1} alt="User" />
          <div className="left">
            <h3>Total Agents</h3>
          </div>
          <div className="right">
            <h1>{agentsData.length}</h1>
          </div>
        </div>

        <br />
        <h1 className="header-fs">Agents list</h1>

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
