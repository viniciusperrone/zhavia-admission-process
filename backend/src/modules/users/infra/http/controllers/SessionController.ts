import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CreateSessionService from '@modules/users/services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const createSession = container.resolve(CreateSessionService);

      const user = await createSession.execute({ email, password });

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

export { SessionController };
