const express = require("express");
const router = express.Router();
const taxController = require("../controllers/taxController");

router.get("/", taxController.getTaxes);
router.post("/", taxController.createTax);
router.get("/:id", taxController.getTaxById);
router.put("/:id", taxController.updateTax);
router.delete("/:id", taxController.deleteTax);

module.exports = router;