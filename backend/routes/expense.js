const express = require('express');
const { createExpense } = require('../controllers/expense');

const router = express.Router();

router.post('/create', createExpense);

module.exports = router;
