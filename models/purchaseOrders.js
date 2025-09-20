const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      tax: { type: mongoose.Schema.Types.ObjectId, ref: "Tax" }
    }
  ],
  status: { type: String, enum: ["Draft", "Billed", "Paid"], default: "Draft" },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
