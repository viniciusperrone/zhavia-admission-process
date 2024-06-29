import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
  CreateArticleService,
  UpdateArticleService,
  ListArticlesService,
  DeleteArticleService,
  ShowArticleService,
} from '@modules/articles/services';

import AppError from '@shared/errors/AppError';

class ArticleController {
  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const getArticles = container.resolve(ListArticlesService);

      const articles = await getArticles.execute();

      return response.json(articles);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const getArticle = container.resolve(ShowArticleService);

      const article = await getArticle.execute(id);

      return response.json(article);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, title, description, slug, category } = request.body;

      const createArticle = container.resolve(CreateArticleService);

      const article = await createArticle.execute({
        user_id,
        title,
        description,
        slug,
        category,
      });

      return response.json(article);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { article_id } = request.params;
      const { title, description, slug, category } = request.body;

      const updateArticle = container.resolve(UpdateArticleService);

      const article = await updateArticle.execute({
        article_id,
        title,
        description,
        slug,
        category,
      });

      return response.json(article);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { article_id } = request.params;

      const deleteArticle = container.resolve(DeleteArticleService);

      await deleteArticle.execute(article_id);

      return response.status(201).json([]);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export { ArticleController };
