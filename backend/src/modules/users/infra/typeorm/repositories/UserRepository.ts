import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';

import User from '../entities/User';

import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';

class UserRepository implements IUserRepository {
  private databaseRepository: Repository<User>;

  constructor() {
    this.databaseRepository = dataSource.getRepository(User);
  }

  public async findById(uuid: string): Promise<IUser | null> {
    const user = await this.databaseRepository.findOne({ where: { uuid } });

    return user;
  }

  public async findAll(): Promise<IUser[]> {
    const users = await this.databaseRepository.find();

    return users;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.databaseRepository.create({ name, email, password });

    await this.databaseRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.databaseRepository.save(user);

    return user;
  }
}

export { UserRepository };
