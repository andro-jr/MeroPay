const express = require('express');
const { addFriend, acceptRequest } = require('../controllers/friend');
const router = express.Router();

router.post('/add-friend', addFriend);
router.post('/accept-request', acceptRequest);

module.exports = router;
