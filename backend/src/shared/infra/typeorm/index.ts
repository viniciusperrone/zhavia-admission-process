import { DataSource } from 'typeorm';

import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mariadb',
  host: 'db',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
});
