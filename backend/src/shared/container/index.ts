import { container } from 'tsyringe';

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
