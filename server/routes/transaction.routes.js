const { Router } = require("express");
const router = Router();
const transactionController = require("../controllers/transactionController");
const { body } = require("express-validator");

const transactionValidate = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be string")
	.trim(),
  body("sum")
    .exists({ checkFalsy: true })
    .withMessage("Sum is required")
    .isNumeric()
    .withMessage("Sum should be number")
	.custom(value => !Array.isArray(value))
	.withMessage("Sum shouldn`t be array"),
  body("date")
    .exists({ checkFalsy: true })
    .withMessage("Date is required")
	.custom(value => !isNaN(new Date(value)))
	.withMessage("Wrong date type")
];

router.get("/", transactionController.getAllTransactions);
router.post("/", transactionValidate, transactionController.addTransaction);
router.delete("/:id", transactionController.deleteTransaction);
router.put("/:id", transactionValidate, transactionController.updateTransaction);

module.exports = router;
