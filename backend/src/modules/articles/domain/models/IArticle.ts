import { IUser } from '@modules/users/domain/models/IUser';

export interface IArticle {
  uuid: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  user: IUser;
  created_at: Date;
  updated_at: Date;
}
