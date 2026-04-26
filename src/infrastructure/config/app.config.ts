export class AppConfig {
  port: number;
  swaggerUrl: string;
  env: string;
  jwtSecret: string;
  static getConfig(): AppConfig {
    return {
      port: parseInt(process.env.PORT || '3000', 10),
      swaggerUrl: process.env.SWAGGER_END_POINT || 'docs',
      env: process.env.NODE_ENV,
      jwtSecret: process.env.JWT_SECRET || 'default-secret',
    };
  }
}
