import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSpace1772999668159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table spaces (
        id uuid default gen_random_uuid() primary key unique,
        name varchar(50) not null,
        environment_name varchar(20) not null,
        auth_token varchar(255) not null,
        is_global boolean default false not null,
        settings jsonb default '{}' not null,
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now()
      )
    `);

    await queryRunner.query(`CREATE UNIQUE INDEX "unique-space-index" ON public.spaces (name, environment_name);`);
    await queryRunner.query(`CREATE UNIQUE INDEX "unique-space-token-index" ON public.spaces (auth_token);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "unique-space-token-index"`);
    await queryRunner.query(`DROP INDEX "unique-space-index"`);
    await queryRunner.query(`drop table spaces`);
  }
}
