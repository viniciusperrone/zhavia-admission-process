import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { IArticle } from '../domain/models/IArticle';

@Injectable()
class ShowArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute(id: string): Promise<IArticle | null> {
    const article = await this.articleRepository.findById(id);

    return article;
  }
}

export default ShowArticleService;
