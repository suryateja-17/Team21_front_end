const SalesOrder = require("../models/SalesOrder");
const Invoice = require("../models/Invoice");

exports.createSalesOrder = async (req, res) => {
  try {
    const so = await SalesOrder.create(req.body);
    res.status(201).json(so);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.convertToInvoice = async (req, res) => {
  try {
    const so = await SalesOrder.findById(req.params.id);
    if (!so) return res.status(404).json({ error: "Sales Order not found" });

    const invoice = await Invoice.create({
      salesOrder: so._id,
      customer: so.customer,
      totalAmount: so.totalAmount
    });

    so.status = "Invoiced";
    await so.save();

    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
