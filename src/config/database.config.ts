import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  database: 'bank',
  synchronize: true,
  entities: ["dist/**/*.entity.js"],
  username: 'postgres',
  password: 'root',
  logging: false,
  dropSchema: false
}
/*
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  database: 'iirhlfrw',
  url: 'postgres://iirhlfrw:pfGnrOQck7Bu--7yF42r48WGHqdJ3LZf@salt.db.elephantsql.com:5432/iirhlfrw',
  synchronize: true,
  entities: ['dist/!**!/!*.entity.js'],
  username: 'iirhlfrw',
  password: 'pfGnrOQck7Bu--7yF42r48WGHqdJ3LZf',
  logging: false,
};
*/
