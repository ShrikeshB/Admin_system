import icons from "../../iconsLinks";
import "./style/agentCard.css";
import axios from "axios";
function AgentCard({
  data,
  getSingleAgentInfo,
  cardStatus,
  getAllAgents,
  updateAgentFormStatus,
  getSingleAgentInfo_UpdateForm,
}) {
  // Prevents errors if data is undefined
  if (!data) return null;

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "N/A";

  const deleteAgent = async () => {
    await axios
      .post(`http://localhost:3001/api/agent/deleteAgent/${data._id}`)
      .then((res) => {
        alert("deleted!");
        getAllAgents();
      });
  };

  return (
    <div className="agentCard">
      <div className="card">
        <div
          className="contents"
          onClick={() => {
            cardStatus();
            getSingleAgentInfo(data._id);
          }}
        >
          <h3>{data.name}</h3>
          <p>{formattedDate}</p>
          <p>{data.dataCount} data assigned</p>
          <div className="view">
            <img className="view-img" src={icons.view} alt="View" />
          </div>
        </div>

        <div className="btns">
          <button
            onClick={() => {
              getSingleAgentInfo_UpdateForm(data._id);
            }}
          >
            <img src={icons.edit} alt="Edit" />
          </button>
          <button onClick={deleteAgent}>
            <img src={icons.del} alt="Delete" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentCard;
