import { IUser } from '@modules/users/domain/models/IUser';

export interface ICreateArticle {
  title: string;
  description: string;
  slug: string;
  category: string;
  user: IUser;
}
