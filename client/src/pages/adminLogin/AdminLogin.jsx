import { useState } from "react";
import "./style/AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/admin/loginAdmin",
        {
          email,
          password,
        }
      );

      console.log(data.token);

      if (data.token != null) {
        localStorage.setItem("authToken", data.token); // Store token
        localStorage.setItem("id", data.id); // Store id

        navigate("/"); // Redirect to dashboard
      } else {
        alert("Invalid login credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed! Please check your credentials.");
    }
  };
  return (
    <div className="AdminLogin" onSubmit={handleSubmit}>
      <div className="logo">
        <h1>Admin</h1>
      </div>
      <form action="">
        <center>
          <h2>login</h2>
        </center>
        <input
          type="text"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="primary-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
