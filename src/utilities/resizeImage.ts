import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const IMAGES_FOLDER = path.join(__dirname, '../../folderImage/images');
const RESIZED_FOLDER = path.join(__dirname, '../../folderImage/resized');

type jsonImagePath = {
  Check : boolean,
  path : string,
}
const resizeImage = async (imageName : string ,width: string,height : string) => {

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
      
      return { Check : false,path : '',};
    }

    if (checkFileResizedIsExists) {
      return { Check : true,path : pathFileResized,};
    } else {
       await sharp(pathFileImage)
        .resize(parseInt(width as unknown as string), parseInt(height as unknown as string))
        .toFile(pathFileResized);
      return { Check : true,path : pathFileResized,};
    }
  } catch (err) {
    return { Check : false,path : pathFileResized,};
    }
  };

  export const isNumeric = (str : string) => {
    return /^\d+$/.test(str); 
  }
export default resizeImage;
