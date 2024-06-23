import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';

@Injectable()
class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
