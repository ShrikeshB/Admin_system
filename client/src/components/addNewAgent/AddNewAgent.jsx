import axios from "axios";
import icons from "../../iconsLinks";
import "./style/AddNewAgent.css";
import { useEffect, useState } from "react";

function AddNewAgent({ status, addAgentFormStatus, getAllAgents }) {
  const [aname, setAname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileCode, setMobileCode] = useState("+91");

  const submitUpdate = async (e) => {
    e.preventDefault();
    const data = { aname, email, password, mobile: mobileCode + "-" + mobile };

    await axios
      .post(`http://localhost:3001/api/agent/addNewAgent`, data)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          alert("agent added");
          //   window.location.reload();
          setAname("");
          setEmail("");
          setPassword("");
          setMobile("");
          setMobileCode("+91");
          getAllAgents();
        } else {
          alert("something went wrong");
        }
      });
  };

  const closeBtn = () => {
    setAname("");
    setEmail("");
    setPassword("");
    setMobile("");
    setMobileCode("");

    addAgentFormStatus();
  };

  useEffect(() => {
    console.log(status);
  }, [status]);
  return (
    <div className={`AddNewAgent ${status ? "active" : ""}`}>
      <div className="container">
        <div className="close-btn" onClick={closeBtn}>
          <img src={icons.close} alt="Close" />
        </div>
        <form onSubmit={submitUpdate}>
          <h1>Add New Agent</h1> <br />
          <input
            type="text"
            placeholder="Name"
            value={aname}
            onChange={(e) => setAname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
              placeholder="Mobile (10 digits)"
              value={mobile}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                if (input.length <= 10) setMobile(input); // Allow max 10 digits
              }}
              pattern="[0-9]{10}" // Ensure exactly 10 digits
              title="Enter a valid 10-digit mobile number"
              required
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="primary-btn">Add Agent</button>
        </form>
      </div>
    </div>
  );
}

export default AddNewAgent;
