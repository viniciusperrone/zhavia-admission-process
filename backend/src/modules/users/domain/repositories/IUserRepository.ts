import { IUser } from '../models/IUser';
import { ICreateUser } from '../models/ICreateUser';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}