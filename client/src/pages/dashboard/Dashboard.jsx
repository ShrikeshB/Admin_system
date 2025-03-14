import AgentCard from "../../components/agentCard/AgentCard";
import CsvCard from "../../components/csvCard/CsvCard";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import icons from "../../iconsLinks";
import "./style/dashboard.css";
function Dashboard() {
  return (
    <div className="Dashboard">
      <SideNavBar />
      <div className="page-container">
        <header>
          <h1>Dashboard</h1>
          <div className="profile">
            <div className="img-container">
              <img src={icons.profile} alt="" />
            </div>
            <h1>Andrew</h1>
          </div>
        </header>
        <div className="card-grp">
          <div className="card">
            <div className="left">
              <img src={icons.user1} alt="" />
              <h3>Total Agents</h3>
            </div>
            <div className="right">
              <h1>10</h1>
            </div>
          </div>
          <div className="card">
            <div className="left">
              <img src={icons.doc1} alt="" />
              <h3>Total files</h3>
            </div>
            <div className="right">
              <h1>10</h1>
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
            <AgentCard />
            <AgentCard />
            <AgentCard />
            <AgentCard />
          </div>
          <center>
            <button className="primary-btn">see more</button>
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
            <CsvCard />
            <CsvCard />
            <CsvCard />
            <CsvCard />
          </div>
          <center>
            <button className="primary-btn">see more</button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
