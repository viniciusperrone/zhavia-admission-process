import { IArticle } from '../models/IArticle';
import { ICreateArticle } from '../models/ICreateArticle';

export interface IArticleRepository {
  create(data: ICreateArticle): Promise<IArticle>;
  update(article: IArticle): Promise<IArticle>;
  findAll(): Promise<IArticle[]>;
  findById(id: string): Promise<IArticle | null>;
  remove(article: IArticle): Promise<void>;
}
