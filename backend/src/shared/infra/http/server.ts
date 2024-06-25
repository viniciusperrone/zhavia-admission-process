import 'reflect-metadata';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import { dataSource } from '../typeorm';
import router from './routes';
import AppError from '@shared/errors/AppError';

dotenv.config();

dataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(router);
  app.use(errors());

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    },
  );

  app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running on port 3000');
  });
});
