const { isValidObjectId } = require('mongoose');
const { sendError } = require('../utils/helper');
const User = require('../models/user');

exports.addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  if (
    !isValidObjectId(userId) ||
    !isValidObjectId(friendId) ||
    userId === friendId
  )
    return sendError(res, 'Invalid Request');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'User not found', 404);

  const friend = await User.findById(friendId);
  if (!friend) return sendError(res, 'Friend not found', 404);

  if (user.pendingFriends.includes(friendId))
    return sendError(res, 'Request is already pending');

  if (user.friends.includes(friendId))
    return sendError(res, 'Friend already exists');

  await user.pendingFriends.push(friendId);
  await friend.pendingFriends.push(userId);

  user.save();
  friend.save();

  res.send({
    message: 'Friend request sent successfully',
  });
};

exports.acceptRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  if (
    !isValidObjectId(userId) ||
    !isValidObjectId(friendId) ||
    userId === friendId
  )
    return sendError(res, 'Invalid Request');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'User not found', 404);

  const friend = await User.findById(friendId);
  if (!friend) return sendError(res, 'Friend not found', 404);

  if (user.friends.includes(friendId))
    return sendError(res, 'Friend already exists');

  const friendIndex = user.pendingFriends.indexOf(friendId);
  if (friendIndex > -1) {
    user.pendingFriends.splice(friendIndex, 1);
  }

  const userIndex = friend.pendingFriends.indexOf(userId);
  if (userIndex > -1) {
    friend.pendingFriends.splice(userIndex, 1);
  }

  await user.friends.push(friendId);
  await friend.friends.push(userId);

  user.save();
  friend.save();

  res.send({
    message: 'Friend request accepted',
  });
};
