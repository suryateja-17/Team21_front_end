const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  refType: { type: String, enum: ["Invoice", "Bill"], required: true },
  refId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  mode: { type: String, enum: ["Cash", "Bank"], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
