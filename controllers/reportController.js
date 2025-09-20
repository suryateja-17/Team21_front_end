const Invoice = require("../models/Invoice");
const Bill = require("../models/Bill");
const Product = require("../models/product");
const ChartOfAccounts = require("../models/chartOfAccounts");

exports.getProfitAndLoss = async (req, res) => {
  try {
    const sales = await Invoice.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const purchases = await Bill.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      sales: sales[0]?.total || 0,
      purchases: purchases[0]?.total || 0,
      profit: (sales[0]?.total || 0) - (purchases[0]?.total || 0)
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStockReport = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBalanceSheet = async (req, res) => {
  try {
    const receivables = await Invoice.aggregate([
      { $match: { status: "Unpaid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const payables = await Bill.aggregate([
      { $match: { status: "Unpaid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const products = await Product.find();
    const stockValue = products.reduce(
      (sum, p) => sum + (p.stockQty || 0) * (p.purchasePrice || 0),
      0
    );

    const sales = await Invoice.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const purchases = await Bill.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const profit = (sales[0]?.total || 0) - (purchases[0]?.total || 0);

    res.json({
      Assets: {
        Cash_Bank: "Handled via Payment records (extendable)",
        AccountsReceivable: receivables[0]?.total || 0,
        Inventory: stockValue
      },
      Liabilities: {
        AccountsPayable: payables[0]?.total || 0
      },
      Equity: {
        RetainedEarnings: profit
      },
      EquationCheck: {
        Assets: (receivables[0]?.total || 0) + stockValue,
        Liabilities_Equity: (payables[0]?.total || 0) + profit,
        Balanced:
          (receivables[0]?.total || 0) + stockValue ===
          (payables[0]?.total || 0) + profit
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
