import 'reflect-metadata';
import '@shared/container';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { dataSource } from '../typeorm';
import router from './routes';

dotenv.config();

dataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(router);

  app.get('/', (req, res) => {
    res.send('Hello wk2mwk2!');
  });

  app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running on port 3000');
  });
});
