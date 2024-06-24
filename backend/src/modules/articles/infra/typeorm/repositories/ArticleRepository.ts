import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';
import Article from '../entities/Article';

import { IArticle } from '@modules/articles/domain/models/IArticle';
import { ICreateArticle } from '@modules/articles/domain/models/ICreateArticle';
import { IArticleRepository } from '@modules/articles/domain/repositories/IArticleRepository';

class ArticleRepository implements IArticleRepository {
  private databaseRepository: Repository<Article>;

  constructor() {
    this.databaseRepository = dataSource.getRepository(Article);
  }

  public async findAll(): Promise<IArticle[]> {
    const articles = await this.databaseRepository.find();

    return articles;
  }

  public async create({
    title,
    description,
    user,
  }: ICreateArticle): Promise<IArticle> {
    const article = this.databaseRepository.create({
      title,
      description,
      user,
    });

    await this.databaseRepository.save(article);

    return article;
  }

  public async update(article: IArticle): Promise<IArticle> {
    await this.databaseRepository.save(article);

    return article;
  }

  public async findById(id: string): Promise<IArticle | null> {
    const article = await this.databaseRepository.findOne({
      where: { uuid: id },
    });

    return article;
  }

  public async remove(article: IArticle): Promise<void> {
    await this.databaseRepository.remove(article);
  }
}

export { ArticleRepository };