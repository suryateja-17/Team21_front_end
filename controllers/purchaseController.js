const PurchaseOrder = require("../models/purchaseOrders");
const Bill = require("../models/Bill");

exports.createPurchaseOrder = async (req, res) => {
  try {
    const po = await PurchaseOrder.create(req.body);
    res.status(201).json(po);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.convertToBill = async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id);
    if (!po) return res.status(404).json({ error: "Purchase Order not found" });

    const bill = await Bill.create({
      purchaseOrder: po._id,
      vendor: po.vendor,
      totalAmount: po.totalAmount
    });

    po.status = "Billed";
    await po.save();

    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
