const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");
const Expense = require("../models/expenses");
const User = require("../models/user");

exports.createExpense = async (req, res) => {
  const { owner, total, members } = req.body;

  if (!isValidObjectId(owner)) return sendError(res, "Invalid Request");

  const newExpense = new Expense({
    owner,
    total,
    members,
  });

  const memberTotal = members
    .map((item) => +item.amount)
    .reduce((acc, item) => item + acc);

  if (memberTotal !== +total) return sendError(res, "Total do not match");

  members.forEach(async (member) => {
    const user = await User.findById(member.userId);
    user.toPay = newExpense._id;
    user.save();
  });

  const ownerUser = await User.findById(owner);
  console.log(ownerUser);

  ownerUser.toReceive = newExpense._id;

  ownerUser.save();
  newExpense.save();

  res.send(newExpense);
};

exports.getAllToReceive = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  if (!isValidObjectId(userId)) return sendError(res, "Invalid Request");

  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found");

  const toReceive = user.toReceive;
  const expenseDetails = [];

  await Promise.all(
    toReceive.map(async (item) => {
      const data = await Expense.findById(item);
      expenseDetails.push(data);
    })
  );

  res.send(expenseDetails);
};

// exports.updateExpenses = async (req, res) => {};
