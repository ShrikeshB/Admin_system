const agentModel = require("../models/AgentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AgentModel = require("../models/AgentModel");
const DataDistribution = require("../models/DataDistribution");

// create new agent and store in database
const addNewAgent = async (req, res) => {
  try {
    const { aname, email, password, mobile } = req.body;

    // Check if all required fields are provided
    if (!aname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // check if the same admin exists
    const existingUser = await agentModel.findOne({ email });
    if (existingUser) {
      console.log("Email is already registered");
      return res.status(400).json({ message: "Email is already registered" });
    }

    // hashing the password using bcrypt for security
    const salt = 10; // salt round
    const hashPassword = await bcrypt.hash(password, salt);

    // storing new agent in database
    const newAgent = agentModel({
      name: aname,
      email: email,
      mobile: mobile,
      password: hashPassword,
    });
    newAgent.save();

    // send response
    console.log("new agent created");
    res.status(201).json({ message: "agent created successfully!" });
  } catch (err) {
    // here expections are handled!
    console.error("Error creating agent:", err); // Log error for debugging
    res
      .status(500)
      .json({ message: "Error creating agent", error: err.message });
  }
};

// delete specific agent
const deleteAgent = async (req, res) => {
  try {
    const { aid } = req.params; // get agent id
    console.log(aid);

    if (!aid) {
      return res.status(400).json({ message: "Agent ID is required!" });
    }
    const doAgentExists = await agentModel.findOne({ _id: aid });

    // checking if agent exists
    if (!doAgentExists) {
      console.log("agent not found!");
      return res.status(400).json({ message: "agent not found!" });
    }
    // deleting all the related list of that agent
    const result1 = await DataDistribution.deleteMany({ agentId: aid });

    const result = await agentModel.deleteOne({ _id: aid });
    console.log(result);

    // checking if the agent is deleted successfully or not!
    if (result.deletedCount > 0) {
      console.log("Agent deleted successfully");
      return res.json({ message: "Agent deleted successfully" });
    } else {
      // if agent is not deleted then send error message
      console.error("internal error");
      return res
        .status(404)
        .json({ message: "internal error while deleting agent" });
    }
  } catch (error) {
    console.error("Error deleting agent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update agent details
const updateAgent = async (req, res) => {
  try {
    const { aid, aname, email, password, mobile } = req.body;

    // aid is required, if aid is not provided then send error message
    if (!aid) {
      return res.status(400).json({ message: "Agent ID is required!" });
    }
    const fieldsToUpdate = {};

    // apply hash only when password has to be updated.
    if (password) {
      const saltRounds = 10;
      fieldsToUpdate.password = await bcrypt.hash(password, saltRounds);
    }

    // creating the object for field that needed to update
    if (aname) fieldsToUpdate.name = aname;
    if (email) fieldsToUpdate.email = email;
    if (mobile) fieldsToUpdate.mobile = mobile;

    console.log(fieldsToUpdate);

    const updatedAgentDoc = await agentModel.findByIdAndUpdate(
      aid,
      fieldsToUpdate,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      }
    );

    // if the updated doc is null then there is no such agent and send error message.
    if (!updatedAgentDoc) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // sending success message
    res.json({ message: "Agent updated successfully", agent: updatedAgentDoc });
  } catch (error) {
    // handling expection here
    console.error("Error updating agent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// helps login agent
const loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  check for missing input field
    if (!email || !password) {
      console.log("Missing email or password in the request body.");
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }

    // Finding the user in the database
    const user = await agentModel.findOne({ email });

    if (!user) {
      console.log("no such agent!");
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // comparing the provided password with the stored hash password
    const isMatch = await bcrypt.compare(password, user.password);

    // if the password doesn't match then send an error message.
    if (!isMatch) {
      console.log("Invalid password.");
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // creating jwt token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload
      process.env.SECRET_KEY, // secret key
      { expiresIn: "24h" } // expiration time
    );

    // set the JWT token in a cookie
    res.cookie("accessToken", token, {
      httpOnly: true, // Prevent JavaScript access
      secure: false, // Set to false for local development
      sameSite: "strict", // Protect against CSRF
    });

    console.log("Login successful");

    // Send a success response along with the token
    res.status(200).json({
      message: "Login successful",
      token, // Including the token in the response for convenience
    });
  } catch (err) {
    console.log("Error during login ", err);
    res
      .status(500)
      .json({ message: "internal error. Please try again later!" });
  }
};

// fetch all the agents data
// const getAllAgents = async (req, res) => {
//   try {
//     const agents = await agentModel.find().lean();
//     res.status(200).json(agents);
//   } catch (err) {
//     console.error("Error fetching agents:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getAllAgents = async (req, res) => {
  try {
    const { search } = req.params;

    const query =
      search && search !== "null"
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { mobile: { $regex: search, $options: "i" } },
            ],
          }
        : {}; // If search is empty, return all agents

    const agents = await agentModel.aggregate([
      { $match: query }, // Apply search filter only if needed
      {
        $lookup: {
          from: "datadistributions",
          localField: "_id",
          foreignField: "agentId",
          as: "distributedData",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          mobile: 1,
          createdAt: 1,
          dataCount: { $size: "$distributedData" },
        },
      },
    ]);

    res.status(200).json(agents);
  } catch (err) {
    console.error("Error fetching agents:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




const getLimitedAgents = async (req, res) => {
  try {
    const agents = await agentModel.aggregate([
      {
        $lookup: {
          from: "datadistributions", // Ensure this matches your MongoDB collection name
          localField: "_id",
          foreignField: "agentId",
          as: "distributedData",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          mobile: 1,
          createdAt: 1,
          dataCount: { $size: "$distributedData" }, // Count of assigned tasks per agent
        },
      },
      { $sort: { createdAt: -1 } }, // Sort by most recent first
      { $limit: 5 }, // Limit to 5 agents
    ]);

    res.status(200).json(agents);
  } catch (err) {
    console.error("Error fetching agents:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get specific agent data
const getSingleAgent = async (req, res) => {
  try {
    const { aid } = req.params;
    const agent = await agentModel.findOne({ _id: aid }).lean();

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json(agent);
  } catch (err) {
    console.error("Error fetching single agent:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total count of agent data available
const getAgentCount = async (req, res) => {
  try {
    const count = await AgentModel.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching agent count:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addNewAgent,
  deleteAgent,
  updateAgent,
  loginAgent,
  getAllAgents,
  getSingleAgent,
  getAgentCount,
  getLimitedAgents,
};
