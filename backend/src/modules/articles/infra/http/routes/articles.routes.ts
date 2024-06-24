import { Router } from 'express';

import { ArticleController } from '../controllers/ArticleController';

const articlesRouter = Router();
const articleController = new ArticleController();

articlesRouter.get('/list', articleController.list);
articlesRouter.get('/:id', articleController.get);
articlesRouter.post('/create', articleController.create);
articlesRouter.put('/:id', articleController.update);
articlesRouter.delete('/:id', articleController.delete);

export default articlesRouter;
