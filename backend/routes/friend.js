const express = require('express');
const { isAuth } = require('../middleware/auth');

const {
  addFriend,
  acceptRequest,
  getPendingRequests,
  getAllFriends,
  searchFriend,
  rejectRequest,
} = require('../controllers/friend');
const router = express.Router();

router.post('/add-friend', addFriend);
router.post('/accept-request', acceptRequest);
router.post('/reject-request', rejectRequest);
router.get('/pending-requests/:userId', getPendingRequests);
router.get('/all-friends/:userId', getAllFriends);
router.get('/search', searchFriend);

module.exports = router;
