import request from 'supertest';
import app from '../index';
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

describe('Check routers:', () => {
  let responseImageNameInvalid: request.Response;
  let responseWidthInvalid: request.Response;
  let responseHeightInvalid: request.Response;
  const imageNameInvalid = 'test2.jpg';
  const imageName = 'test.jpg';
  const width = '200';
  const widthInvalid = '100sdsds';
  const height = '200';
  const heightInvalid = '1000000';

  beforeEach(async () => {
    responseImageNameInvalid = await request(app).get(
      `/resizedimage?imageName=${imageNameInvalid}&width=${width}&height=${height}`,
    );
    responseWidthInvalid = await request(app).get(
      `/resizedimage?imageName=${imageName}&width=${widthInvalid}&height=${height}`,
    );
    responseHeightInvalid = await request(app).get(
      `/resizedimage?imageName=${imageName}&width=${width}&height=${heightInvalid}`,
    );
  });

  it('Check function resizeImage return status 400 and text is Image not exists in folder: ', () => {
    expect(responseImageNameInvalid.status).toBe(400);
    expect(responseImageNameInvalid.text).toBe('File not found or error resized !');
  });

  it('Check function resizeImage return status 400 and text is Invalid width parameters : ', () => {
    expect(responseWidthInvalid.status).toBe(400);
    expect(responseWidthInvalid.text).toBe('Invalid width parameters');
  });

  it('Check function resizeImage return status 400 and text is File not found or error resized ! : ', () => {
    expect(responseHeightInvalid.status).toBe(400);
    expect(responseHeightInvalid.text).toBe('File not found or error resized !');
  });
});

describe("Test function resized :",()=>{
  const imageNameInvalid = 'test2.jpg';
  const imageName = 'test.jpg';
  const width = '200';
  const widthInvalid = '100sdsds';
  const height = '200';
  const heightInvalid = '1000000';

  it('Check function resizeImage return object true and path file: ', () => {
    resizeImage(imageName,width,height).then((result) => {
      expect(result.Check).toBe(true);
    })
  });

  it('Check function resizeImage with imageName invalid return false : ', () => {
    resizeImage(imageNameInvalid,width,height).then((result) => {
      expect(result.Check).toBe(false);
    })
  });

  it('Check function resizeImage with width invalid return false: ', () => {
    resizeImage(imageName,widthInvalid,height).then((result) => {
      expect(result.Check).toBe(false);
    })
  });

  it('Check function resizeImage with height invalid return false: ', () => {
    resizeImage(imageName,width,heightInvalid).then((result) => {
      expect(result.Check).toBe(false);
    })
  });
})
