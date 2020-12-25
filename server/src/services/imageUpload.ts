import multer from 'multer';
import sharp from 'sharp';

export const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb): void {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|tiff)$/)) {
      return cb(
        new Error(
          'Unrecognized file extension. Supported file types are jpg, jpeg, png, gif, svg, tiff.',
        ),
      );
    }
    cb(null, true);
  },
});

interface ProcessImageInput {
  buffer: Buffer;
  width: number;
  height: number;
}

export const processImage = async ({
  buffer,
  width,
  height,
}: ProcessImageInput): Promise<Buffer> => {
  return sharp(buffer).resize({ width, height }).png().toBuffer();
};
