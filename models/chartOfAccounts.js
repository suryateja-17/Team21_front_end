const mongoose = require("mongoose");

const coaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Asset", "Liability", "Expense", "Income", "Equity"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("ChartOfAccounts", coaSchema);
