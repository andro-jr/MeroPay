const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    cb('Supports only image files !', false);
  }
  cb(null, true);
};

let upload = multer({ storage, fileFilter });
exports.multipleUploads = upload.fields([{ name: 'avatar' }, { name: 'QR' }]);
