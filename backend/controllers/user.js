const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const cloudinary = require("../cloud");

const EmailVerificationToken = require("../models/emailVerificationToken");
const PasswordResetToken = require("../models/passwordResetToken");
const User = require("../models/user");

const {
  sendError,
  generateRandomByte,
  uploadImageToCloud,
} = require("../utils/helper");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { otpTemplate } = require("../emailtemplates/otpEmailTemplate");
const { welcomeTemplate } = require("../emailtemplates/welcomeTemplate");
const {
  resetPasswordLinkTemplate,
} = require("../emailtemplates/resetPasswordLinkTemplate");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const usernameExists = await User.findOne({ name });
  if (usernameExists) return sendError(res, "This username is already taken");

  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, "This email is already in Use");
  const newUser = new User({ name, email, password });
  await newUser.save();

  // Generate 6 digit OPT
  let otp = generateOTP(6);

  // Store otp inside Db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: otp,
  });

  await newEmailVerificationToken.save();

  //send otp to user
  var transport = generateMailTransporter();

  transport.sendMail({
    form: "verification@ourapp.com",
    to: newUser.email,
    subject: "Email Verification",
    // html: `<p>Your verification OTP</p>
    // <h1>${otp}</h1>
    // `,
    html: otpTemplate(otp),
  });

  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!isValidObjectId(userId)) {
    return res.json({ error: "Invalid user!" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return sendError(res, "User not found!", 404);
  }

  if (user.isVerified) {
    return sendError(res, "User is already verified!");
  }

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) {
    return sendError(res, "Invalid OTP");
  }

  const isMatched = await token.compareToken(otp);
  if (!isMatched) {
    return sendError(res, "Please submit a valid OTP!");
  }

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  //send otp to user
  var transport = generateMailTransporter();

  transport.sendMail({
    form: "meropaytest@gmail.com",
    to: user.email,
    subject: "Welcome Email",
    html: welcomeTemplate(user.name),
  });

  const jwtToken = jwt.sign({ euserId: user._id }, process.env.JWT_SECRET);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar.url,
      token: jwtToken,
      isVerified: user.isVerified,
    },
    message: "Your email is verified",
  });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, "User not found", 404);
  }
  if (user.isVerified) {
    return sendError(res, "User already verified");
  }

  const hasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (hasToken) {
    return sendError(res, "Next token only after five minutes");
  }

  // Generate 6 digit OPT
  let otp = generateOTP(6);

  // Store otp inside Db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: otp,
  });

  await newEmailVerificationToken.save();

  //send otp to user
  var transport = generateMailTransporter();

  transport.sendMail({
    form: "verification@ourapp.com",
    to: user.email,
    subject: "Email Verification",
    // html: `<p>Your verification OTP</p>
    // <h1>${otp}</h1>
    // `,
    html: otpTemplate(otp),
  });

  res.json({ message: "New Otp has been sent to your email" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "Email is missing");

  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, "User not found", 404);
  }

  const hasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (hasToken) {
    return sendError(res, "Next token only after five minutes.");
  }

  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

  var transport = generateMailTransporter();

  transport.sendMail({
    form: "security@ourapp.com",
    to: user.email,
    subject: "Reset Password",
    html: resetPasswordLinkTemplate(resetPasswordUrl),
  });

  res.json({ message: "Reset link sent to your email" });
};

exports.sendRequestPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not Found", 404);
  const matchedPass = await user.comparePass(newPassword);

  if (matchedPass)
    return sendError(
      res,
      "The new password must be different than the old one"
    );

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  res.json({ message: "Password changed successfully" });
};

exports.singIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email or Password mismatch", 404);

  const userMatched = await user.comparePass(password);
  if (!userMatched) return sendError(res, "Email or Password Mismatch", 404);

  const jwtToken = jwt.sign({ euserId: user._id }, process.env.JWT_SECRET);

  const { _id, name, avatar, isVerified, paymentQR } = user;

  res.json({
    user: {
      id: _id,
      name,
      email,
      token: jwtToken,
      isVerified,
      avatar: avatar.url,
      paymentQR: paymentQR?.url,
    },
  });
};

exports.updateUser = async (req, res) => {
  const { username: name } = req.body;
  const { avatar, QR } = req.files;
  const { userId } = req.params;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid ID");
  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found!", 404);

  // upload new avatar if there is one
  if (avatar) {
    const { url, public_id } = await uploadImageToCloud(avatar[0].path);
    user.avatar = { url, public_id };
    await user.save();
  }

  const QR_public_id = user.paymentQR?.public_id;

  // remove old image if there was one
  if (QR_public_id && QR) {
    const { result } = await cloudinary.uploader.destroy(QR_public_id);
    if (result !== "ok")
      return sendError(res, "Could not remove image from cloud!");
  }

  // upload new avatar if there is one
  if (QR) {
    const { url, public_id } = await uploadImageToCloud(QR[0].path);
    user.paymentQR = { url, public_id };
    await user.save();
  }

  if (name) {
    user.name = name;
  }
  await user.save();

  res.json({
    message: "User updated successfully",
  });
};

exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid ID");

  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found!", 404);

  res.send(user);
};
