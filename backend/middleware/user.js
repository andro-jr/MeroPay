const { isValidObjectId } = require('mongoose');
const { sendError } = require('../utils/helper');
const User = require('../models/user');
const PasswordResetToken = require('../models/passwordResetToken');

exports.isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  console.log(userId);

  if (!token || !token.trim() || !isValidObjectId(userId))
    return sendError(res, 'Unauthorized access');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'User not Found', 404);

  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken) return sendError(res, 'Invalid Token, not found', 404);

  const validToken = await resetToken.compareToken(token);
  if (!validToken) return sendError(res, 'Invalid token');

  req.resetToken = resetToken;

  next();
};
