import express, { Express } from 'express';
import dotenv from 'dotenv';
import tokenRouter from './routers/tokenRouter';
import AWS from 'aws-sdk';

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT;

AWS.config.update({
  accessKeyId: <string>process.env.AWS_ACCESS_KEY,
  secretAccessKey: <string>process.env.AWS_SECRET_ACCESS_KEY,
  region: <string>process.env.AWS_REGION
});

app.use('/tokens', tokenRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running on port ${port}`);
});