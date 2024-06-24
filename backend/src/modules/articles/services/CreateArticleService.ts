import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IArticleRepository } from '../domain/repositories/IArticleRepository';
import { ICreateArticle } from '../domain/models/ICreateArticle';
import { IArticle } from '../domain/models/IArticle';

@Injectable()
class CreateArticleService {
  constructor(
    @Inject('ArticleRepository')
    private articleRepository: IArticleRepository,
  ) {}

  public execute({
    user,
    title,
    description,
  }: ICreateArticle): Promise<IArticle> {
    const article = this.articleRepository.create({
      user,
      title,
      description,
    });

    return article;
  }
}

export default CreateArticleService;
