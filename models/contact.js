const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Customer', 'Vendor', 'Both'] },
  email: String,
  mobile: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
