import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '123',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  entities: ['src/entities/*.ts'],
  synchronize: Boolean(process.env.POSTGRES_SYNCHRONIZE || true),
  logging: Boolean(process.env.POSTGRES_LOGGING || true),
});
