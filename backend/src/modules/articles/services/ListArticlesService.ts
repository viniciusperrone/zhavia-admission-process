import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { IArticle } from '../domain/models/IArticle';

@Injectable()
class ListArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public async execute(): Promise<IArticle[]> {
    const articles = await this.articleRepository.findAll();

    return articles;
  }
}

export default ListArticleService;
