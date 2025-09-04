import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1756966910058 implements MigrationInterface {
    name = 'InitialSchema1756966910058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "umail" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "umail"`);
    }

}
