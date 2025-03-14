const DataDistribution = require("../models/DataDistribution");

// adding list data in database
const addData = async (req, res) => {
  try {
    const { agentId, firstName, phone, notes } = req.body;

    // Check if all required fields are provided
    if (!agentId || !firstName || !phone || !notes) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newData = DataDistribution({
      agentId: agentId,
      firstName: firstName,
      phone: phone,
      notes: notes,
    });

    newData.save();

    console.log("list is added!");
    res.status(201).json({ message: "list is added successfully!" });
  } catch (err) {
    // here expections are handled!
    console.error("Error in adding data:", err); // Log error for debugging
    res
      .status(500)
      .json({ message: "Error in adding data:", error: err.message });
  }
};

// fetching list of specific agent
const getListOfAgent = async (req, res) => {
  try {
    const { aid } = req.params;
    const data = await DataDistribution.find({ agentId: aid }).lean();

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetching specific list data
const getSingleListData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DataDistribution.findOne({ _id: id }).lean();

    if (!data) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching single data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total count of list data available
const getListCount = async (req, res) => {
  try {
    const count = await DataDistribution.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching list count:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addData, getListOfAgent, getSingleListData, getListCount };
