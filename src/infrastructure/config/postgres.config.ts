export class PostgresConfig {
  host: string;
  port: number;
  userName: string;
  password: string;
  database: string;
  migrations: Array<string>;
  static getConfig(): PostgresConfig {
    return {
      host: 'localhost',
      port: 5432,
      userName: 'test',
      password: 'test',
      database: 'config-db',
      migrations: ['dist/infrastructure/typeorm/migrations/*.js'],
    };
  }
}
