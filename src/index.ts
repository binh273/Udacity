import express from 'express';
import routers from './routers/resizeImage_Router';

const app = express();
const port = 3000;

app.use(routers);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
