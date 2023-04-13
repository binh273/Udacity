import express from 'express';
import checkParameters from '../middleware/check_Parameters';
import resizeImage from '../utilities/resizeImage';

const routers = express.Router();

routers.get('/resizedimage',checkParameters, (req : express.Request , res : express.Response) => {
    const { width, height, imageName } = req.query;
    resizeImage(imageName as string, width as string, height as string).then( (result) => {
        if(result.Check) {
        res.status(200).sendFile(result.path);
        }else{
            res.status(400).send("File not found or error resized !");
        }
    });

    
});

export default routers;
