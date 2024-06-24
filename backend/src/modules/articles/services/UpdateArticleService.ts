import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { IArticle } from '../domain/models/IArticle';

@Injectable()
class UpdateArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute(article: IArticle): Promise<IArticle> {
    await this.articleRepository.update(article);

    return article;
  }
}

export default UpdateArticleService;
