import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mariadb',
  host: 'db',
  username: 'zhavia',
  password: 'zhavia-password',
  database: 'zhavia-db',
  port: 3306,
});
