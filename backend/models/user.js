const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  avatar: {
    type: Object,
    url: String,
    public_id: String,
  },
  friends: {
    type: Array,
    default: [],
  },
  pendingFriends: {
    type: Array,
    default: [],
  },
  expensesCreated: {
    type: Array,
    default: [],
  },
  expensesIncluded: {
    type: Array,
    default: [],
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePass = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model('User', userSchema);
