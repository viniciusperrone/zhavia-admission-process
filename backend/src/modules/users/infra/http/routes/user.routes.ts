import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import { UsersController } from '../controllers/UsersController';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/list', userController.list);
usersRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

export default usersRouter;
