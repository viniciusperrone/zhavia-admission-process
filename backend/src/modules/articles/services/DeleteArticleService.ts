import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { IArticle } from '../domain/models/IArticle';

@Injectable()
class DeleteArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute(article: IArticle): Promise<void> {
    await this.articleRepository.remove(article);
  }
}

export default DeleteArticleService;
