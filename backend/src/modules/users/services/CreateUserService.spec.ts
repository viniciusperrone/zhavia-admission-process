import AppError from '@shared/errors/AppError';
import { FakeUserRepository } from '../domain/repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Vinicius',
      email: 'vinicius@gmail.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('uuid');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Vinicius',
      email: 'vinicius@gmail.com',
      password: '12345678',
    });

    expect(
      createUser.execute({
        name: 'Vinicius',
        email: 'vinicius@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
