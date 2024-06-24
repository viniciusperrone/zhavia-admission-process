import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import articlesRouter from '@modules/articles/infra/http/routes/articles.routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/article', articlesRouter);

export default router;
