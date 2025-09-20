const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  method: { type: String, enum: ["Percentage", "Fixed"], required: true },
  applicableOn: { type: String, enum: ["Sales", "Purchase"], required: true },
  rate: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Tax", taxSchema);
