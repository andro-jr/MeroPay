const { isValidObjectId } = require("mongoose");
const { sendError, uploadImageToCloud } = require("../utils/helper");
const Expense = require("../models/expenses");
const User = require("../models/user");

exports.createExpense = async (req, res) => {
  const { owner, members, expenseName } = req.body;

  if (!isValidObjectId(owner)) return sendError(res, "Invalid Request");

  const newExpense = new Expense({
    owner,
    members,
    expenseName,
  });

  const memberTotal = members
    .map((item) => +item.amount)
    .reduce((acc, item) => item + acc);

  // if (memberTotal !== +total) return sendError(res, "Total do not match");

  members.forEach(async (member) => {
    const user = await User.findById(member.userId);
    user.toPay.push(newExpense._id);
    user.save();
  });

  const ownerUser = await User.findById(owner);

  ownerUser.toReceive.push(newExpense._id);

  ownerUser.save();
  newExpense.save();

  res.send(newExpense);
};

exports.getAllToReceive = async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid Request");

  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found");

  const toReceive = user.toReceive;
  const expenseDetails = [];

  await Promise.all(
    toReceive.map(async (item) => {
      const data = await Expense.findById(item);
      console.log(data);
      expenseDetails.push(data);
    })
  );

  res.send(expenseDetails);
};

exports.getAllToPay = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  if (!isValidObjectId(userId)) return sendError(res, "Invalid Request");

  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found");

  const topay = user.toPay;
  const expenseDetails = [];

  await Promise.all(
    topay.map(async (item) => {
      const data = await Expense.findById(item);
      expenseDetails.push(data);
    })
  );

  res.send(expenseDetails);
};

exports.updateExpenses = async (req, res) => {
  const { expenseId, userId } = req.body;

  if (!isValidObjectId(userId) || !isValidObjectId(expenseId))
    return sendError(res, "Invalid Request");
  const expense = await Expense.findById(expenseId);
  if (!expense) return sendError(res, "Expense Not Found");

  await Promise.all(
    expense.members.map(async (item) => {
      if (item.userId.valueOf() == userId) {
        item.status = "unapproved";
        if (req.file) {
          try {
            const { url, public_id } = await uploadImageToCloud(req.file.path);
            item.paymentScreenshot = { url, public_id };
          } catch (err) {
            console.log(err);
            return sendError(res, err);
          }
        }
      }
    })
  );

  expense.save();

  res.send({ message: "Payment sent for approval" });
};

exports.approveExpense = async (req, res) => {
  const { expenseId, userId } = req.body;

  if (!isValidObjectId(userId) || !isValidObjectId(expenseId))
    return sendError(res, "Invalid Request");
  const expense = await Expense.findById(expenseId);
  if (!expense) return sendError(res, "Expense Not Found");

  await Promise.all(
    expense.members.map(async (item) => {
      if (item.userId.valueOf() == userId) {
        item.status = "approved";
      }
    })
  );

  console.log(expense);

  let flag = 0;

  expense.members.forEach((item) => {
    if (item.status !== "approved") {
      flag = 1;
    }
  });

  console.log(flag);
  if (flag === 0) {
    expense.completed = true;
    console.log("expense is completed");
  }

  await expense.save();

  res.send({ message: "Expense approved" });
};

exports.getExpenseDetails = async (req, res) => {
  const { expenseId } = req.params;

  if (!isValidObjectId(expenseId)) return sendError(res, "Invalid ID");

  const expense = await Expense.findById(expenseId);

  if (!expense) return sendError(res, "Expense not found!", 404);

  res.send(expense);
};
