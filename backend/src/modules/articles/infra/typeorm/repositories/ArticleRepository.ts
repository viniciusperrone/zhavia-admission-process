import { Repository } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm';
import { ElasticsearchConnection } from '@shared/infra/elasticsearch';
import Article from '../entities/Article';

import { IArticle } from '@modules/articles/domain/models/IArticle';
import { ICreateArticle } from '@modules/articles/domain/models/ICreateArticle';
import { IArticleRepository } from '@modules/articles/domain/repositories/IArticleRepository';

class ArticleRepository implements IArticleRepository {
  private databaseRepository: Repository<Article>;
  private elasticsearch: ElasticsearchConnection;
  private readonly documentIndex = 'articles';

  constructor() {
    this.databaseRepository = dataSource.getRepository(Article);
    this.elasticsearch = new ElasticsearchConnection();
  }

  public async findAll(): Promise<IArticle[]> {
    const articles = await this.databaseRepository.find();

    return articles;
  }

  public async findBySlug(slug: string): Promise<IArticle | null> {
    const article = await this.databaseRepository.findOne({
      where: { slug },
    });

    return article;
  }

  public async create({
    title,
    description,
    slug,
    category,
    user,
  }: ICreateArticle): Promise<IArticle> {
    const article = this.databaseRepository.create({
      title,
      description,
      slug,
      category,
      user,
    });

    await this.databaseRepository.save(article);

    await this.elasticsearch.indexDocument(this.documentIndex, article);

    return article;
  }

  public async update(article: IArticle): Promise<IArticle> {
    await this.databaseRepository.save(article);

    await this.elasticsearch.updateDocument(
      this.documentIndex,
      article.uuid,
      article,
    );

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

    await this.elasticsearch.removeDocument(this.documentIndex, article.uuid);
  }
}

export { ArticleRepository };
