const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendError } = require('../utils/helper');

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) return sendError(res, 'Invalid Token');

  const jwtToken = token.split(' ')[1];

  if (!jwtToken) {
    return sendError(res, 'Invalid Token');
  }
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { euserId: userId } = decode;

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'Invalid Token! User not found', 404);

  req.user = user;
  next();
};
