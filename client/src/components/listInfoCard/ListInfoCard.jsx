import icons from "../../iconsLinks";
import "./style/ListInfoCard.css";

function ListInfoCard({ data, status, listCardStatus }) {
  if (!data) return null;
  const formattedDate = data.assignedAt
    ? new Date(data.assignedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "N/A";
  return (
    <div className={`ListInfoCard ${status ? "active" : ""}`}>
      <div className="container">
        <div className="close-btn">
          <img src={icons.close} alt="" onClick={listCardStatus} />
        </div>

        <div className="contents">
          <div className="header">
            <h2>{data.firstName}</h2>
            <h3>+91-{data.phone}</h3>
            <p>{formattedDate}</p>
          </div>
          <p className="para">{data.notes} </p>
        </div>
      </div>
    </div>
  );
}

export default ListInfoCard;
