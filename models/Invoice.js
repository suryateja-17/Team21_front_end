const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  salesOrder: { type: mongoose.Schema.Types.ObjectId, ref: "SalesOrder", required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
  issuedAt: { type: Date, default: Date.now },
  paidAt: Date
});

module.exports = mongoose.model("Invoice", invoiceSchema);
