import { MigrationInterface, QueryRunner } from "typeorm"

export class table1675839186849 implements MigrationInterface {
  name = "table1675839186849"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Darajasi" ALTER COLUMN "ortachas" SET DEFAULT \'0\'')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Darajasi" ALTER COLUMN "ortachas" DROP DEFAULT')
  }
}
