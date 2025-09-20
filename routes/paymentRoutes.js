const express = require("express");
const { 
  makePayment, 
  getPayments, 
  getPaymentById, 
  updatePayment, 
  deletePayment 
} = require("../controllers/paymentController");
const router = express.Router();

router.get("/", getPayments);
router.get("/:id", getPaymentById);
router.post("/", makePayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
