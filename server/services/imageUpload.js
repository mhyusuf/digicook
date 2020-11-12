const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|tiff)$/)) {
      return cb(
        new Error(
          'Unrecognized file extension. Supported file types are jpg, jpeg, png, gif, svg, tiff.'
        )
      );
    }
    cb(null, true);
  }
});

const processImage = async ({ buffer, width, height }) =>
  await sharp(buffer).resize({ width, height }).png().toBuffer();

module.exports = { upload, processImage };
