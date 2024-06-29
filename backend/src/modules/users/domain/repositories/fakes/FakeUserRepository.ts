import { v4 as uuidv4 } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';

import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findAll(): Promise<IUser[]> {
    return this.users;
  }

  public async findById(uuid: string): Promise<User | null> {
    const user = this.users.find(user => user.uuid === uuid) || null;

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find(user => user.email === email) || null;

    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();

    user.uuid = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    Object.assign(this.users, user);

    return user;
  }
}

export { FakeUserRepository };
