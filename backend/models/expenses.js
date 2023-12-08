const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "unapproved", "approved"],
    default: "pending",
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentScreenshot: {
    type: Object,
    url: String,
    public_id: String,
  },
});

const expenseSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expenseName: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    members: [memberSchema],
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
