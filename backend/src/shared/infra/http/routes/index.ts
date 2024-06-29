import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import articlesRouter from '@modules/articles/infra/http/routes/articles.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import searchRouter from '@modules/articles/infra/http/routes/search.routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/article', articlesRouter);
router.use('/login', sessionRouter);
router.use('/query', searchRouter);

export default router;
