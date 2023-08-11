const crypto = require('crypto');
const cloudinary = require('../cloud');

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.handleNotFound = (req, res) => {
  this.sendError(res, 'Not Found', 404);
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const bufferString = buff.toString('hex');
      resolve(bufferString);
    });
  });
};

exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(file);

  return { url, public_id };
};
