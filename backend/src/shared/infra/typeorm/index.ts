import { DataSource } from 'typeorm';

import dotenv from 'dotenv';

import User from '@modules/users/infra/typeorm/entities/User';
import Article from '@modules/articles/infra/typeorm/entities/Article';

import {
  CreateUsersMigration,
  CreateArticlesMigration,
  AddUserIdToArticleMigration,
} from './migrations';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mariadb',
  host: 'db',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
  entities: [User, Article],
  migrations: [
    CreateUsersMigration,
    CreateArticlesMigration,
    AddUserIdToArticleMigration,
  ],
});
