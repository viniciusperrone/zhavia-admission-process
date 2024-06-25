import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { IArticle } from '../domain/models/IArticle';
import AppError from '@shared/errors/AppError';

@Injectable()
class ShowArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute(id: string): Promise<IArticle | null> {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new AppError('Could not find any article with the given id.');
    }

    return article;
  }
}

export default ShowArticleService;
