import { useNavigate } from "react-router-dom";
import icons from "../../iconsLinks";
import "./style/SideNavBar.css";
function SideNavBar({ flag }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    navigate("/adminlogin"); // Redirect to login page
  };
  return (
    <div className="SideNavBar">
      <h1 className="logo">Admin</h1>

      <nav>
        <ul>
          <li className={flag == "dashboard" ? "active" : ""}>
            <a href="/">
              <div className="img-container">
                <img src={icons.dash1} alt="dashboard icon" />
              </div>
              <p>dashboard</p>
            </a>
          </li>
          <li className={flag == "ManageFiles" ? "active" : ""}>
            <a href="/ManageFiles">
              <div className="img-container">
                <img src={icons.doc1} alt="dashboard icon" />
              </div>
              <p>Manage CSV</p>
            </a>
          </li>
          <li className={flag == "ManageAgents" ? "active" : ""}>
            <a href="/ManageAgents">
              <div className="img-container">
                <img src={icons.user1} alt="dashboard icon" />
              </div>
              <p>Manage agents</p>
            </a>
          </li>
          <li>
            <a href="" onClick={handleLogout}>
              <div className="img-container">
                <img src={icons.logout} alt="dashboard icon" />
              </div>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNavBar;
