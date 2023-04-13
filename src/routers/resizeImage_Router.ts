import express from 'express';
import checkParameters from '../middleware/check_Parameters';
import resizeImage from '../utilities/resizeImage';

const routers = express.Router();

routers.use(checkParameters);

routers.get('/resizedimage', resizeImage);

export default routers;
