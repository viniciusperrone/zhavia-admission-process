import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SearchArticleService } from '@modules/articles/services';

import AppError from '@shared/errors/AppError';

class SearchController {
  public async search(request: Request, response: Response): Promise<Response> {
    try {
      const { query } = request.body;

      const searchArticles = container.resolve(SearchArticleService);

      const articles = await searchArticles.execute({ query });

      return response.json(articles);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export { SearchController };
