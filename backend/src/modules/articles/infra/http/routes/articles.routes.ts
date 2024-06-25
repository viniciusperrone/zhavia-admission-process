import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import { ArticleController } from '../controllers/ArticleController';

const articlesRouter = Router();
const articleController = new ArticleController();

articlesRouter.get('/list', articleController.list);

articlesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  articleController.get,
);

articlesRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  articleController.create,
);

articlesRouter.put(
  '/:article_id',
  celebrate({
    [Segments.PARAMS]: {
      article_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().optional(),
      description: Joi.string().optional(),
    },
  }),
  articleController.update,
);

articlesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  articleController.delete,
);

export default articlesRouter;
