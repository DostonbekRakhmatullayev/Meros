import { MigrationInterface, QueryRunner } from "typeorm"

export class table1675691399539 implements MigrationInterface {
  name = "table1675691399539"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Products" ADD "time" TIMESTAMP NOT NULL DEFAULT now()')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Products" DROP COLUMN "time"')
  }
}
