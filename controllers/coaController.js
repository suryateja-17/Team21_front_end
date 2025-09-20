const ChartOfAccounts = require("../models/chartOfAccounts");

// Get all accounts
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await ChartOfAccounts.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create account
exports.createAccount = async (req, res) => {
  try {
    const account = new ChartOfAccounts(req.body);
    const savedAccount = await account.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get account by ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await ChartOfAccounts.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update account
exports.updateAccount = async (req, res) => {
  try {
    const updatedAccount = await ChartOfAccounts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    await ChartOfAccounts.findByIdAndDelete(req.params.id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};