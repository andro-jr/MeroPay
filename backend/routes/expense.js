const express = require("express");
const { createExpense, getAllToReceive } = require("../controllers/expense");

const router = express.Router();

router.post("/create", createExpense);
router.get("/to-receive/:userId", getAllToReceive);

module.exports = router;
