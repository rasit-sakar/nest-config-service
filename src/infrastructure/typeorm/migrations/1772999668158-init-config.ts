import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1772999668158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`CREATE TABLE users (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
      "username" varchar(100) NOT NULL,
      description varchar(200),
      secret_key varchar(255) NOT NULL,
      secret_password text NOT NULL,
      is_admin boolean NOT NULL DEFAULT false
    )`);

    // Create spaces table
    await queryRunner.query(`CREATE TABLE spaces (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
      name varchar(50) NOT NULL,
      environment varchar(20) NOT NULL,
      description varchar(200)
    )`);

    // Create user_space_auths table
    await queryRunner.query(`CREATE TABLE user_space_auths (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
      user_id uuid NOT NULL,
      space_name varchar(50) NOT NULL,
      environment varchar(20) NOT NULL,
      auth varchar NOT NULL
    )`);

    // Create configs table
    await queryRunner.query(`CREATE TABLE configs (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
      name varchar(100) NOT NULL,
      value jsonb NOT NULL,
      space_name varchar(50) NOT NULL,
      description text,
      is_disabled boolean NOT NULL DEFAULT false,
      is_secret boolean NOT NULL DEFAULT false,
      created_at timestamp NOT NULL,
      created_by uuid NOT NULL,
      updated_at timestamp NOT NULL,
      updated_by uuid NOT NULL
    )`);

    // Create config_history table
    await queryRunner.query(`CREATE TABLE config_history (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY UNIQUE,
      config_id uuid NOT NULL,
      update_reason text,
      old_value jsonb,
      new_value jsonb,
      changed_by varchar(255),
      change_date timestamp NOT NULL
    )`);

    // Create indexes
    await queryRunner.query(`CREATE UNIQUE INDEX "unique-config-index" ON public.configs ("name", space_name)`);
    await queryRunner.query(`CREATE INDEX "configs-disabled-index" ON public.configs ("name", space_name, is_disabled)`);
    await queryRunner.query(`CREATE INDEX "configs-space-filter-index" ON public.configs (space_name)`);
    await queryRunner.query(`CREATE INDEX "configs-space-disabled-index" ON public.configs (space_name, is_disabled)`);
    await queryRunner.query(`CREATE INDEX "config-history-config-id-index" ON public.config_history (config_id)`);
    await queryRunner.query(`CREATE INDEX "user-space-auths-user-id-index" ON public.user_space_auths (user_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "user-space-auths-user-id-index"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "config-history-config-id-index"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "configs-space-disabled-index"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "configs-space-filter-index"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "configs-disabled-index"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "unique-config-index"`);
    await queryRunner.query(`DROP TABLE IF EXISTS config_history`);
    await queryRunner.query(`DROP TABLE IF EXISTS configs`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_space_auths`);
    await queryRunner.query(`DROP TABLE IF EXISTS spaces`);
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
