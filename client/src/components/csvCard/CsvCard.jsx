import icons from "../../iconsLinks";
import "./style/CsvCard.css";
function CsvCard({ data }) {
  if (!data) return null;

  const formattedDate = data?.uploadedAt
    ? new Date(data.uploadedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "N/A";
  return (
    <div className="CsvCard">
      <div className="img-container">
        <img src={icons.doc1} alt="" />
      </div>
      <div className="contents">
        <h4>{data.fileName}</h4>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
}

export default CsvCard;
