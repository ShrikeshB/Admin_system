// importing packages and libs
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const AdminRoutes = require("./routes/AdminRoutes");
const AgentsRoutes = require("./routes/AgentsRoutes");
const DataDistributionRoutes = require("./routes/DataDistributionRoutes");
const CSVRoutes = require("./routes/CSVRoutes");

// configuration of server for better communication between client and server
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect mongoDB
connectDB();

app.use("/api/admin", AdminRoutes);
app.use("/api/agent", AgentsRoutes);
app.use("/api/dataDistribution", DataDistributionRoutes);
app.use("/api/CSVFiles", CSVRoutes);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("server running on port " + process.env.PORT);
  }
});
