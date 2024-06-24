import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import AppError from '@shared/errors/AppError';

@Injectable()
class DeleteArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute(uuid: string): Promise<void> {
    const existArticle = await this.articleRepository.findById(uuid);

    if (!existArticle) {
      throw new AppError('Could not find any article with the given id.');
    }

    await this.articleRepository.remove(existArticle);
  }
}

export default DeleteArticleService;
