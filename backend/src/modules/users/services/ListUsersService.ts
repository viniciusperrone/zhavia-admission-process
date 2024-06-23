import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

@Injectable()
class ListUsersService {
  constructor(
    @Inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = this.usersRepository.findAll();

    return users;
  }
}

export default ListUsersService;
