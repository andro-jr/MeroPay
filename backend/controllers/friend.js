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

exports.getPendingRequests = async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) return sendError(res, 'Invalid Request');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'User not found', 404);

  const pendingFriendsData = await user.pendingFriends;

  const friendsArray = await Promise.all(
    pendingFriendsData.map(async (friendId) => {
      const friend = await User.findById(friendId);
      if (friend) {
        return {
          userId: friend.id,
          name: friend.name,
          email: friend.email,
        };
      }
    })
  );

  res.send(friendsArray);
};

exports.getAllFriends = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  if (!isValidObjectId(userId)) return sendError(res, 'Invalid Request');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'User not found', 404);

  const friendsData = await user.friends;

  const friendsArray = await Promise.all(
    friendsData.map(async (friendId) => {
      const friend = await User.findById(friendId);
      if (friend) {
        return {
          userId: friend.id,
          name: friend.name,
          email: friend.email,
        };
      }
    })
  );

  res.send(friendsArray);
};

exports.searchFriend = async (req, res) => {
  const { query } = req;
  const { userId } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, 'Invalid Request');

  // const result = await Actor.find({ $text: { $search: `"${query.name}"` } });
  const result = await User.find({ $text: { $search: `"${query.name}"` } });
  if (result.length === 0) return sendError(res, 'User Not Found', 404);

  const [friend] = result;
  const isAlreadyFriend = friend.friends.includes(userId) ? true : false;
  const requestAlreadySent = friend.pendingFriends.includes(userId)
    ? true
    : false;

  res.send({
    result,
    isAlreadyFriend,
    requestAlreadySent,
  });
};
