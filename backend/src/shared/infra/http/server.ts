import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { dataSource } from '../typeorm';

dotenv.config();

dataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello COAOA!');
  });

  app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running on port 3000');
  });
});
