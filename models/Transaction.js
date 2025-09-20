const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  tax: { type: Schema.Types.ObjectId, ref: "Tax" },
});

const transactionSchema = new Schema({
  type: { type: String, enum: ["Invoice", "Bill"], required: true },
  contact: { type: Schema.Types.ObjectId, ref: "Contact", required: true },
  items: [transactionItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
