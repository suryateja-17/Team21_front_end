const Tax = require("../models/tax");

// Get all taxes
exports.getTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.json(taxes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create tax
exports.createTax = async (req, res) => {
  try {
    const tax = new Tax(req.body);
    const savedTax = await tax.save();
    res.status(201).json(savedTax);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get tax by ID
exports.getTaxById = async (req, res) => {
  try {
    const tax = await Tax.findById(req.params.id);
    if (!tax) return res.status(404).json({ message: "Tax not found" });
    res.json(tax);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update tax
exports.updateTax = async (req, res) => {
  try {
    const updatedTax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTax);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete tax
exports.deleteTax = async (req, res) => {
  try {
    await Tax.findByIdAndDelete(req.params.id);
    res.json({ message: "Tax deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};