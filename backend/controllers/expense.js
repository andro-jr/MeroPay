const { isValidObjectId } = require('mongoose');
const { sendError } = require('../utils/helper');
const Expense = require('../models/expenses');
const User = require('../models/user');

exports.createExpense = (req, res) => {
  const { owner, total, members } = req.body;

  if (!isValidObjectId(owner)) return sendError(res, 'Invalid Request');

  const newExpense = new Expense({
    owner,
    total,
    members,
  });

  members.forEach(async (member) => {
    const user = await User.findById(member.userId);
    user.expensesIncluded = newExpense._id;
    user.save();
  });

  newExpense.save();

  res.send(newExpense);
};
