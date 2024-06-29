import { container } from 'tsyringe';

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { ArticleRepository } from '@modules/articles/infra/typeorm/repositories/ArticleRepository';
import { IArticleRepository } from '@modules/articles/domain/repositories/IArticleRepository';

import { ElasticsearchConnection } from '@shared/infra/elasticsearch';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IArticleRepository>(
  'ArticleRepository',
  ArticleRepository,
);

container.registerSingleton<ElasticsearchConnection>(
  'ElasticsearchConnection',
  ElasticsearchConnection,
);
