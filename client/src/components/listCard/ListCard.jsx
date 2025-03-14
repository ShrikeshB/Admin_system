import icons from "../../iconsLinks";
import "./style/ListCard.css";

function ListCard({ data, listCardStatus, getSingleListInfo }) {
  if (!data) return null;

  const formattedDate = data?.assignedAt
    ? new Date(data.assignedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "N/A";

  return (
    <div className="ListCard">
      <div className="card">
        <div
          className="contents"
          onClick={() => {
            listCardStatus();
            getSingleListInfo(data._id);


          }}
        >
          <h4>{data?.firstName || "Unknown"}</h4>
          <p>{formattedDate}</p>
          <p>{data?.phone || "N/A"}</p>
          <div className="view">
            <img className="view-img" src={icons.view} alt="View Details" />
          </div>
        </div>

        {/* <div className="btns">
          <button>
            <img src={icons.del} alt="Delete" />
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default ListCard;
