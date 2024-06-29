import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

import { SearchController } from '../controllers/SearchController';

const searchRouter = Router();
const searchController = new SearchController();

searchRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      query: Joi.string().optional(),
    },
  }),
  searchController.search,
);

export default searchRouter;
