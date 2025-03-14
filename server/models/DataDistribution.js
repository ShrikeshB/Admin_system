const mongoose = require("mongoose");

const DataDistributionSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  assignedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DataDistribution", DataDistributionSchema);
