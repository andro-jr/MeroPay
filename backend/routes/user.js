const express = require('express');
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  singIn,
} = require('../controllers/user');
const {
  userValidator,
  validate,
  signValidate,
} = require('../middleware/validator');
const { isAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerificationToken);

router.post('/sign-in', signValidate, validate, singIn);
router.get('/is-auth', isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
});

module.exports = router;
