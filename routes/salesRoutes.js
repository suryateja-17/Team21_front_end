const express = require("express");
const { createSalesOrder, convertToInvoice } = require("../controllers/salesController");
const router = express.Router();

router.post("/", createSalesOrder);
router.post("/:id/convert", convertToInvoice);

module.exports = router;
