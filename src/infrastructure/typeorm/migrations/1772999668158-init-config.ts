import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1772999668158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table configs (
            id uuid default gen_random_uuid() primary key unique,
            name varchar(100) not null,
            value jsonb not null,
            space_name varchar(50) not null,
            environment_name varchar(20) not null,
            description text,
            is_disabled boolean default false,
            is_secret boolean default false,
            created_at timestamp DEFAULT now(),
            updated_at timestamp DEFAULT now()
        )`);

    await queryRunner.query(`create table config_history(
	        id uuid default gen_random_uuid() primary key unique,
	        config_id uuid not null,
 	        update_reason text,
	        old_value jsonb,
	        new_value jsonb,
	        changed_by jsonb,
	        enablement_change boolean,
	        change_date timestamp DEFAULT now()
        )`);

    await queryRunner.query(`CREATE UNIQUE INDEX "unique-config-index" ON public.configs ("name",space_name,environment_name);`);
    await queryRunner.query(`CREATE INDEX "unique-config-index" ON public.configs ("name",space_name,environment_name,is_disabled);`);
    await queryRunner.query(`CREATE INDEX "default-filter-index" ON public.configs (space_name,environment_name);`);
    await queryRunner.query(
      `CREATE INDEX "default-filter-with-disabled-index" ON public.configs (space_name,environment_name, is_disabled);`,
    );
    await queryRunner.query(`CREATE INDEX "config-history-foreing-key" ON public.config_history (config_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "config-history-foreing-key"`);
    await queryRunner.query(`DROP INDEX "unique-config-index"`);
    await queryRunner.query(`drop table configs`);
    await queryRunner.query(`drop table config_history`);
  }
}
