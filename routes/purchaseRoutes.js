const express = require("express");
const { createPurchaseOrder, convertToBill } = require("../controllers/purchaseController");
const router = express.Router();

router.post("/", createPurchaseOrder);
router.post("/:id/convert", convertToBill);

module.exports = router;
