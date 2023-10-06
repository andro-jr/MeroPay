const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    default: {
      url: "https://res.cloudinary.com/dl6kwsl4n/image/upload/v1691680015/user_ykjisp.png",
      public_id: "user_ykjisp",
    },
  },
  paymentQR: {
    type: Object,
    url: String,
    public_id: String,
  },
  friends: {
    type: Array,
    default: [],
  },
  sentRequest: {
    type: Array,
    default: [],
  },
  receivedRequest: {
    type: Array,
    default: [],
  },
  toReceive: {
    type: Array,
    default: [],
  },
  toPay: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePass = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.index({ name: "text" });

module.exports = mongoose.model("User", userSchema);

// https://res.cloudinary.com/dl6kwsl4n/image/upload/v1691680015/user_ykjisp.png
