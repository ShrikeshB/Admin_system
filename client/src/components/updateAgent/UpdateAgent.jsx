import axios from "axios";
import icons from "../../iconsLinks";
import "./style/UpdateAgent.css";
import { useState } from "react";

function UpdateAgent({ data, status, updateAgentFormStatus, getAllAgents }) {
  const [aname, setAname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const submitUpdate = async (e) => {
    e.preventDefault();
    const fieldsToUpdate = {};
    fieldsToUpdate.aid = data._id;
    if (aname) fieldsToUpdate.aname = aname;
    if (email) fieldsToUpdate.email = email;
    if (password) fieldsToUpdate.password = password;
    if (mobile) fieldsToUpdate.mobile = mobile;

    console.log(fieldsToUpdate);

    await axios
      .post(`http://localhost:3001/api/agent/updateAgent`, fieldsToUpdate)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          alert("agent details updated");
          //   window.location.reload();
          getAllAgents();
        } else {
          alert("something went wrong   ");
        }
      });
  };

  const closeBtn = () => {
    setAname("");
    setEmail("");
    setPassword("");
    setMobile("");
    updateAgentFormStatus();
  };
  return (
    <div className={`UpdateAgent ${status ? "active" : ""}`}>
      <div className="container">
        <div className="close-btn" onClick={closeBtn}>
          <img src={icons.close} alt="Close" />
        </div>
        <form onSubmit={submitUpdate}>
          <h1>Update Agent {data.name}</h1> <br />
          <input
            type="text"
            placeholder={data.name}
            value={aname}
            onChange={(e) => setAname(e.target.value)}
          />
          <input
            type="email"
            placeholder={data.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder={data.mobile}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="password"
            placeholder="xxxxx"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary-btn">Update Agent</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAgent;
