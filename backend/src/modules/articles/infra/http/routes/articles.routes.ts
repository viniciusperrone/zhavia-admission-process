import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

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
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      slug: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  articleController.create,
);

articlesRouter.put(
  '/:article_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      article_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      slug: Joi.string().optional(),
      category: Joi.string().optional(),
    },
  }),
  articleController.update,
);

articlesRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  articleController.delete,
);

export default articlesRouter;
