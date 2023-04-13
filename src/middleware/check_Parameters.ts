import express, { NextFunction } from 'express';
import path from 'path';

const EXTENSION_FROMATS = ['.png', '.jpg'];

const checkParameters = (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  const { imageName, width, height } = req.query;
  const checkWidth = !width || parseInt(width as string) <= 0;
  const checkHeight = !height || parseInt(height as string) <= 0;

  if (
    !imageName ||
    !EXTENSION_FROMATS.includes(path.extname(imageName as string))
  ) {
    res.status(400).send('Invalid original file names');
    return 0;
  }

  if (checkWidth) {
    res.status(400).send('Invalid width parameters');
    return 0;
  }

  if (checkHeight) {
    res.status(400).send('Invalid height parameters');
    return 0;
  }

  next();
};

export default checkParameters;
