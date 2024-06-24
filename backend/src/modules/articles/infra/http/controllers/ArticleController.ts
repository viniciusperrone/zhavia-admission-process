import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
  CreateArticleService,
  UpdateArticleService,
  ListArticlesService,
  DeleteArticleService,
  ShowArticleService,
} from '@modules/articles/services';

class ArticleController {
  public async list(request: Request, response: Response): Promise<Response> {
    const getArticles = container.resolve(ListArticlesService);

    const articles = await getArticles.execute();

    return response.json(articles);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getArticle = container.resolve(ShowArticleService);

    const article = await getArticle.execute(id);

    return response.json(article);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, title, description } = request.body;

    const createArticle = container.resolve(CreateArticleService);

    const article = await createArticle.execute({
      user_id,
      title,
      description,
    });

    return response.json(article);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { article_id } = request.params;
    const { title, description } = request.body;

    const updateArticle = container.resolve(UpdateArticleService);

    const article = await updateArticle.execute({
      article_id,
      title,
      description,
    });

    return response.json(article);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { article_id } = request.params;

    const deleteArticle = container.resolve(DeleteArticleService);

    await deleteArticle.execute(article_id);
  }
}

export { ArticleController };
