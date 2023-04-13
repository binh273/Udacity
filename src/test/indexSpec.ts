import request from 'supertest';
import Request from 'request';
import app from '../index';
import routers from '../routers/resizeImage_Router';
import resizeImage from '../utilities/resizeImage';

describe('Check middleware:', () => {
  let response: request.Response;
  let responseImageName: request.Response;
  let responseWidth: request.Response;
  let responseHeight: request.Response;
  const imageName = 'test.jpg';
  const width = 200;
  const height = 200;
  const heightInvalid = 0;

  beforeEach(async () => {
    response = await request(app).get(
      `/resizedimage?imageName=${imageName}&width=${width}&height=${height}`,
    );
    responseImageName = await request(app).get(
      `/resizedimage?imageName=&width=${width}&height=${height}`,
    );
    responseWidth = await request(app).get(
      `/resizedimage?imageName=${imageName}&width=&height=${height}`,
    );
    responseHeight = await request(app).get(
      `/resizedimage?imageName=${imageName}&width=${width}&height=${heightInvalid}`,
    );
  });

  it('Check url with full parameters return status 200 : ', () => {
    expect(response.status).toBe(200);
  });

  it('Check url with parameters imageName = null return status 400 and text is Invalid imageName : ', () => {
    expect(responseImageName.status).toBe(400);
    expect(responseImageName.text).toBe('Invalid original file names');
  });

  it('Check url with missing parameters width return text Invalid Width: ', () => {
    expect(responseWidth.text).toBe('Invalid width parameters');
  });

  it('Check url with parameters height = 0 return status 400 : ', () => {
    expect(responseHeight.status).toBe(400);
  });
});

describe('Check function resizeImage:', () => {
  let responseImageNameInvalid: request.Response;
  let responseWidth: request.Response;
  const imageNameInvalid = 'test2.jpg';
  const imageName = 'test.jpg';
  const width = 200;
  const height = 200;
  const widthInvalid = 1000000;

  beforeEach(async () => {
    responseImageNameInvalid = await request(app).get(
      `/resizedimage?imageName=${imageNameInvalid}&width=${width}&height=${height}`,
    );
    responseWidth = await request(app).get(
      `/resizedimage?imageName=${imageName}&width=${widthInvalid}&height=${height}`,
    );
  });

  it('Check function resizeImage status 400 and text is Image not exists in folder: ', () => {
    expect(responseImageNameInvalid.status).toBe(404);
    expect(responseImageNameInvalid.text).toBe('Image not exists in folder');
  });

  it('Check function resizeImage return status 500 and text is Resizing the image error!. : ', () => {
    expect(responseWidth.status).toBe(500);
    expect(responseWidth.text).toBe('Resizing the image error!.');
  });
});

