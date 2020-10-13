import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeormOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: false,
  entities: [path.resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [
    path.resolve(__dirname, '..', 'database', 'migrations', '*{.ts,.js}'),
  ],
  subscribers: [path.resolve(__dirname, '..', 'subscriber', '*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/**/*.entity.ts',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export = typeormOptions;
