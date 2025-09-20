const express = require("express");

const router = express.Router();

const coaController = require("../controllers/coaController");



router.get("/", coaController.getAccounts);

router.post("/", coaController.createAccount);

router.get("/:id", coaController.getAccountById);

router.put("/:id", coaController.updateAccount);

router.delete("/:id", coaController.deleteAccount);



module.exports = router;