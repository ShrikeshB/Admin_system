import { useEffect, useState } from "react";
import icons from "../../iconsLinks";
import images from "../../imageLink";
import ListCard from "../listCard/ListCard";
import "./style/AgentInfoCard.css";
import axios from "axios";

function AgentInfoCard({
  data,
  status,
  cardStatus,
  listCardStatus,
  getSingleListInfo,
}) {
  const [listData, setListData] = useState([]);

  const formattedDate = data?.createdAt
    ? new Date(data.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "N/A";

  const fetchList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/dataDistribution/getListOfAgent/${data._id}`
      );
      setListData(res.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  useEffect(() => {
    if (data?._id) {
      fetchList();
    }
  }, [data?._id]); // Runs only when `data._id` changes

  return (
    <div className={`AgentInfoCard ${status ? "active" : ""}`}>
      <div className="container">
        <div className="close-btn" onClick={cardStatus}>
          <img src={icons.close} alt="Close" />
        </div>
        <div className="left">
          <div className="profile">
            <img src={icons.profile} alt="Profile" />
          </div>
          <h3>{data?.name || "Unknown Agent"}</h3>
          <h5>{data?.mobile || "N/A"}</h5>
          <p>{formattedDate}</p>
        </div>
        <div className="right">
          <center>
            <h1>List</h1>
          </center>
          <div className="list">
            {listData.length > 0 ? (
              listData.map((val) => (
                <ListCard
                  key={val._id}
                  data={val}
                  listCardStatus={listCardStatus}
                  getSingleListInfo={getSingleListInfo}
                />
              ))
            ) : (
              <p>No list found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentInfoCard;
