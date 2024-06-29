import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { IArticle } from '../domain/models/IArticle';
import AppError from '@shared/errors/AppError';

@Injectable()
class ShowBySlugArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute(slug: string): Promise<IArticle | null> {
    const article = await this.articleRepository.findBySlug(slug);

    if (!article) {
      throw new AppError('Could not find any article with the given slug.');
    }

    return article;
  }
}

export default ShowBySlugArticleService;
