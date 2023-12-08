const express = require("express");
const {
  createExpense,
  getAllToReceive,
  updateExpenses,
  approveExpense,
  getAllToPay,
  getExpenseDetails,
} = require("../controllers/expense");

const { singleUpload } = require("../middleware/multer");

const router = express.Router();

router.post("/create", createExpense);
router.post("/update", singleUpload.single("screenshot"), updateExpenses);
router.post("/approve", approveExpense);
router.get("/to-receive/:userId", getAllToReceive);
router.get("/to-pay/:userId", getAllToPay);
router.get("/details/:expenseId", getExpenseDetails);

module.exports = router;
