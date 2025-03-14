import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

import Agents from "./pages/agents/Agents";
import ManageFiles from "./pages/manageFiles/ManageFiles";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/ManageAgents" Component={Agents} />
        <Route path="/ManageFiles" Component={ManageFiles} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
