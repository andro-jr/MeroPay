const express = require("express");
const { isAuth } = require("../middleware/auth");

const {
  addFriend,
  acceptRequest,
  getPendingRequests,
  getAllFriends,
  searchFriend,
  rejectRequest,
  cancelFriendRequest,
  removeFriend,
} = require("../controllers/friend");
const router = express.Router();

router.post("/add-friend", addFriend);
router.post("/accept-request", acceptRequest);
router.post("/reject-request", rejectRequest);
router.post("/cancel-request", cancelFriendRequest);
router.post("/remove-friend", removeFriend);
router.get("/pending-requests/:userId", getPendingRequests);
router.get("/all-friends/:userId", getAllFriends);
router.get("/search", searchFriend);

module.exports = router;
