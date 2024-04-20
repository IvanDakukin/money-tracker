const { Router } = require("express");
const router = Router();
const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.getAllTransactions);
router.post("/", transactionController.addTransaction);
router.delete("/:id", transactionController.deleteTransaction);
router.put("/:id", transactionController.updateTransaction);

module.exports = router;
