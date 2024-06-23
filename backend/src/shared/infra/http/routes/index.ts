import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';

const router = Router();

router.use('/user', usersRouter);

export default router;
