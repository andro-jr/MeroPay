const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  },
  amount: {
    type: Number,
    required: true,
  },
});

const expenseSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  members: [memberSchema],
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
