import { IUser } from '../models/IUser';
import { ICreateUser } from '../models/ICreateUser';

export interface IUserRepository {
  findById(uuid: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
