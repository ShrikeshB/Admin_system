const mongoose = require("mongoose");

// schema for agent
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Agent", agentSchema);
