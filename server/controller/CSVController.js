const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const CSVFileModel = require("../models/CSVFileModel");
const Agent = require("../models/AgentModel"); // Import Agent model
const DataDistribution = require("../models/DataDistribution"); // Import DataDistribution model

const uploadCSVFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { adminId } = req.body;

    const newCSVFileModel = new CSVFileModel({
      adminId: adminId,
      fileName: req.file.originalname,
    });

    newCSVFileModel.save();

    const filePath = req.file.path;
    // console.log("File stored at:", filePath);

    const results = [];

    // Read CSV file and store contents in results array
    fs.createReadStream(filePath)
      .pipe(csv()) // Parsing CSV
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        try {
          // Fetch up to 5 agents from the database
          const agents = await Agent.find().limit(5);
          if (agents.length === 0) {
            return res.status(400).json({ message: "No agents found!" });
          }

          // Distribute tasks among agents
          const agentTasks = Array.from({ length: agents.length }, () => []);

          // Ensure all tasks are properly assigned

          results.forEach((item, index) => {
            const agentIndex = index % agents.length; // Ensure correct assignment
            agentTasks[agentIndex].push(item);
          });

          // Prepare data for insertion
          const dataEntries = [];
          agents.forEach((agent, i) => {
            agentTasks[i].forEach((task) => {
              dataEntries.push({
                agentId: agent._id,
                firstName: task.FirstName,
                phone: task.Phone,
                notes: task.Notes || "",
              });
            });
          });

          // console.log("Data Entries to Insert:", dataEntries);

          // Check if all 27 items are assigned
          console.log("Total tasks assigned:", dataEntries.length); // Debugging line

          // Insert distributed data into the database
          await DataDistribution.insertMany(dataEntries);

          // Send success response after everything is completed
          res.status(200).json({
            message: "File uploaded and data distributed successfully!",
            totalItems: dataEntries.length,
            distributedData: dataEntries,
          });
        } catch (dbError) {
          console.error("Database Error:", dbError);
          res.status(500).json({ message: "Error saving data to database" });
        }
      })
      .on("error", (err) => {
        console.error("Error reading CSV file:", err);
        res.status(500).json({ message: "Error processing CSV file" });
      });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

// fetch all the agents data
const getCSVFile = async (req, res) => {
  try {
    const agents = await CSVFileModel.find().lean();
    res.status(200).json(agents);
  } catch (err) {
    console.error("Error fetching files names:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total count of files  available
const getFilesCount = async (req, res) => {
  try {
    const count = await CSVFileModel.countDocuments();

    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching files count:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetch limited the agents data
const getLimitedCSVFile = async (req, res) => {
  try {
    const agents = await CSVFileModel.find().sort({ _id: -1 }).limit(5).lean();
    res.status(200).json(agents);
  } catch (err) {
    console.error("Error fetching file names:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  uploadCSVFile,
  getCSVFile,
  getLimitedCSVFile,
  getFilesCount,
};
