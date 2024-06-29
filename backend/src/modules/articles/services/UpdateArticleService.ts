import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { IArticle } from '../domain/models/IArticle';
import { IUpdateArticle } from '../domain/models/IUpdateArticle';
import AppError from '@shared/errors/AppError';

@Injectable()
class UpdateArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute({
    article_id,
    title,
    description,
    slug,
    category,
  }: IUpdateArticle): Promise<IArticle> {
    const dateUpdated = new Date();

    const articleExist = await this.articleRepository.findById(article_id);

    if (!articleExist) {
      throw new AppError('Could not find any article with the given id.');
    }

    const article = await this.articleRepository.update({
      ...articleExist,
      title,
      description,
      slug,
      category,
      updated_at: dateUpdated,
    });

    return article;
  }
}

export default UpdateArticleService;
