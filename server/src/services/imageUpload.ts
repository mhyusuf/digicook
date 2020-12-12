import multer from 'multer';
import sharp from 'sharp';

// Defines object of type Multer, which imposes limits on what can be uploaded
// This config specifies max file size and accepted file extensions
const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb): void {
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

interface ProcessImageInput {
  buffer: Buffer;
  width: number;
  height: number;
}

const processImage = async ({
  buffer,
  width,
  height
}: ProcessImageInput): Promise<Buffer> => {
  return await sharp(buffer).resize({ width, height }).png().toBuffer();
};

export default { upload, processImage };
