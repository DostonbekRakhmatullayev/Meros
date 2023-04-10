import { MigrationInterface, QueryRunner } from "typeorm"

export class table1675719696510 implements MigrationInterface {
  name = "table1675719696510"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Products" DROP CONSTRAINT "FK_91bb43fc195d7faee92f4f5c847"')
    await queryRunner.query('ALTER TABLE "Products" DROP COLUMN "korzinkaId"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Products" ADD "korzinkaId" uuid')
    await queryRunner.query(
      'ALTER TABLE "Products" ADD CONSTRAINT "FK_91bb43fc195d7faee92f4f5c847" FOREIGN KEY ("korzinkaId") REFERENCES "Korzinka"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }
}
