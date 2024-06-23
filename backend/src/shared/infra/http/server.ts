import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
