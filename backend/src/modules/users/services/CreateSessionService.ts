import { injectable as Injectable, inject as Inject } from 'tsyringe';

import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';

import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequestSession extends Omit<ICreateUser, 'name'> {}

interface IResponseSession {
  user: IUser;
  token: string;
}

@Injectable()
class CreateSessionService {
  constructor(
    @Inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequestSession): Promise<IUser> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    return user;
  }
}

export default CreateSessionService;
