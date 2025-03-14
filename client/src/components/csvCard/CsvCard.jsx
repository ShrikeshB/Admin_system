import icons from "../../iconsLinks";
import "./style/CsvCard.css";
function CsvCard() {
  return (
    <div className="CsvCard">
      <div className="img-container">
        <img src={icons.doc1} alt="" />
      </div>
      <div className="contents">
        <h4>Some file name here...</h4>
        <p>12:00 10-03-2025</p>
      </div>
    </div>
  );
}

export default CsvCard;
