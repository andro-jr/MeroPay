const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  singIn,
  forgetPassword,
  sendRequestPasswordTokenStatus,
  resetPassword,
  updateUser,
  getUserDetails,
} = require("../controllers/user");
const {
  userValidator,
  validate,
  signValidate,
  validatePassword,
} = require("../middleware/validator");
const { isAuth } = require("../middleware/auth");
const { isValidPassResetToken } = require("../middleware/user");
const { uploadAvatar, multipleUploads } = require("../middleware/multer");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forgot-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendRequestPasswordTokenStatus
);
router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);
router.post(
  "/update/:userId",
  // isAuth,
  multipleUploads,
  updateUser
);

router.post("/sign-in", signValidate, validate, singIn);
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar.url,
      isVerified: user.isVerified,
      paymentQR: user.paymentQR?.url,
    },
  });
});

router.get("/details/:userId", getUserDetails);

module.exports = router;
