import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';

import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

@Injectable()
class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used!');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
