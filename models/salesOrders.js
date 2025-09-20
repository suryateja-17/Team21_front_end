const mongoose = require("mongoose");

const salesOrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      tax: { type: mongoose.Schema.Types.ObjectId, ref: "Tax" }
    }
  ],
  status: { type: String, enum: ["Draft", "Invoiced", "Paid"], default: "Draft" },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SalesOrder", salesOrderSchema);
