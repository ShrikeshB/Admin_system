import icons from "../../iconsLinks";
import "./style/SideNavBar.css";
function SideNavBar() {
  return (
    <div className="SideNavBar">
      <h1 className="logo">LOGO</h1>

      <nav>
        <ul>
          <li className="active">
            <a href="">
              <div className="img-container">
                <img src={icons.dash1} alt="dashboard icon" />
              </div>
              <p>dashboard</p>
            </a>
          </li>
          <li>
            <a href="">
              <div className="img-container">
                <img src={icons.doc1} alt="dashboard icon" />
              </div>
              <p>Manage CSV</p>
            </a>
          </li>
          <li>
            <a href="">
              <div className="img-container">
                <img src={icons.user1} alt="dashboard icon" />
              </div>
              <p>Manage agents</p>
            </a>
          </li>
          <li>
            <a href="">
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
