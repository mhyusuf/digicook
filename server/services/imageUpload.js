const multer = require('multer');
const sharp = require('sharp');

// Defines object of type Multer, which imposes limits on what can be uploaded
// This config specifies max file size and accepted file extensions
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

// Defines a function that takes in a Buffer, and two numerical dimensions,
// Then passed to a sharp method that returns a displayable image file
const processImage = async ({ buffer, width, height }) =>
  await sharp(buffer).resize({ width, height }).png().toBuffer();

module.exports = { upload, processImage };
