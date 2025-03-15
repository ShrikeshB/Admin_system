import axios from "axios";
import icons from "../../iconsLinks";
import "./style/UpdateAgent.css";
import { useState } from "react";

function UpdateAgent({ data, status, updateAgentFormStatus, getAllAgents }) {
  const [aname, setAname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileCode, setMobileCode] = useState("+91");

  const submitUpdate = async (e) => {
    e.preventDefault();
    const fieldsToUpdate = {};
    const phone = mobileCode + "-" + mobile;
    fieldsToUpdate.aid = data._id;
    if (aname) fieldsToUpdate.aname = aname;
    if (email) fieldsToUpdate.email = email;
    if (password) fieldsToUpdate.password = password;
    if (mobile) fieldsToUpdate.mobile = phone;

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
          <div className="mobile-inputs">
            <select
              onChange={(e) => {
                setMobileCode(e.target.value);
              }}
            >
              <option value="+91">+91</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
              <option value="+1">+1</option>
              <option value="+81">+81</option>
              <option value="+971">+971</option>
            </select>
            <input
              type="tel"
              placeholder={data.mobile}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                if (input.length <= 10) setMobile(input); // Allow max 10 digits
              }}
              pattern="[0-9]{10}" // Ensure exactly 10 digits
              title="Enter a valid 10-digit mobile number"
            />
          </div>
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
