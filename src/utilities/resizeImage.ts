import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const IMAGES_FOLDER = path.join(__dirname, '../../folderImage/images');
const RESIZED_FOLDER = path.join(__dirname, '../../folderImage/resized');

const resizeImage = async (req: express.Request, res: express.Response) => {
  const { imageName, width, height } = req.query;
  const pathFileImage = path.join(IMAGES_FOLDER, `${imageName}`);
  const checkFileImageIsExists = fs.existsSync(pathFileImage);
  const pathFileResized = path.join(
    RESIZED_FOLDER,
    `${imageName}_${width}_${height}.jpg`,
  );
  const checkFileResizedIsExists = fs.existsSync(
    path.join(RESIZED_FOLDER, imageName as string),
  );

  try {
    if (!checkFileImageIsExists) {
      res.status(404).send('Image not exists in folder');
      return 0;
    }

    if (checkFileResizedIsExists) {
      res.sendFile(pathFileResized);
    } else {
      await sharp(pathFileImage)
        .resize(parseInt(width as string), parseInt(height as string))
        .toFile(pathFileResized);
      res.status(200);
      res.sendFile(pathFileResized);
    }
  } catch (err) {
    res.status(500).send('Resizing the image error!.');
  }
};

export default resizeImage;
