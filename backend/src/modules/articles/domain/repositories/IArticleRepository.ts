import { IArticle } from '../models/IArticle';
import { ICreateArticle } from '../models/ICreateArticle copy';
import { IUpdateArticle } from '../models/IUpdateArticle';

export interface IArticleRepository {
  create(data: ICreateArticle): Promise<IArticle>;
  update(data: IUpdateArticle): Promise<IArticle>;
  findById(id: string): Promise<IArticle>;
  remove(id: string): Promise<void>;
}
