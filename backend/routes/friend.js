const express = require('express');
const {
  addFriend,
  acceptRequest,
  getPendingRequests,
  getAllFriends,
} = require('../controllers/friend');
const router = express.Router();

router.post('/add-friend', addFriend);
router.post('/accept-request', acceptRequest);
router.get('/pending-requests', getPendingRequests);
router.get('/all-friends', getAllFriends);

module.exports = router;
