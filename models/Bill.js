const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
  issuedAt: { type: Date, default: Date.now },
  paidAt: Date
});

module.exports = mongoose.model("Bill", billSchema);
