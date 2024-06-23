import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/list', userController.list);
usersRouter.post('/create', userController.create);

export default usersRouter;
