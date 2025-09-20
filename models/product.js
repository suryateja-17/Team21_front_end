const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Goods', 'Service'] },
  salesPrice: Number,
  purchasePrice: Number,
  salesTax: Number,
  purchaseTax: Number,
  hsnCode: String,
  category: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
