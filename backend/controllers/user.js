const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken');

const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');

const { sendError } = require('../utils/helper');
const { generateOTP, generateMailTransporter } = require('../utils/mail');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, 'This email is already in Use');
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
    form: 'verification@ourapp.com',
    to: newUser.email,
    subject: 'Email Verification',
    html: `<p>Your verification OTP</p>
    <h1>${otp}</h1>
    `,
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
    return res.json({ error: 'Invalid user!' });
  }

  const user = await User.findById(userId);

  if (!user) {
    return sendError(res, 'User not found!', 404);
  }

  if (user.isVerified) {
    return sendError(res, 'User is already verified!');
  }

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) {
    return sendError(res, 'Invalid OTP');
  }

  const isMatched = await token.compareToken(otp);
  if (!isMatched) {
    return sendError(res, 'Please submit a valid OTP!');
  }

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  //send otp to user
  var transport = generateMailTransporter();

  transport.sendMail({
    form: 'verification@ourapp.com',
    to: user.email,
    subject: 'Welcome Email',
    html: `
    <h1>Welcome to our app.</h1>
    `,
  });

  const jwtToken = jwt.sign({ euserId: user._id }, process.env.JWT_SECRET);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
      isVerified: user.isVerified,
    },
    message: 'Your email is verified',
  });
};
