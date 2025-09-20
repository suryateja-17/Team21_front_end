const express = require("express");
const { getProfitAndLoss, getStockReport, getBalanceSheet  } = require("../controllers/reportController");
const router = express.Router();

router.get("/pnl", getProfitAndLoss);
router.get("/stock", getStockReport);
router.get("/balance-sheet", getBalanceSheet);

module.exports = router;
