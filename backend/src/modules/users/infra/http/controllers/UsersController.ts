import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersService from '@modules/users/services/ListUsersService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

class UsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({ name, email, password });

      return response.json(user);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export { UsersController };
