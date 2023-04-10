import { MigrationInterface, QueryRunner } from "typeorm"

export class table1675685159916 implements MigrationInterface {
  name = "table1675685159916"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Darajasi" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "star" integer NOT NULL, "increment" integer NOT NULL, "ortachas" numeric, "productsId" uuid, CONSTRAINT "REL_d9275cfdbe9ce48577e38a83c0" UNIQUE ("productsId"), CONSTRAINT "PK_fa89588df48182116cafe7ef13f" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "Users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(63) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(100), "gendry" character varying(100), "password" character varying(100) NOT NULL, "avatar" character varying(100), CONSTRAINT "PK_8785e595618207cdd87e37b742b" PRIMARY KEY ("user_id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "Korzinka" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zakas_soni" integer NOT NULL, "productsId" uuid, "usersId" uuid, CONSTRAINT "PK_743eb05ff766d2e0d9bd093012c" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "Level" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cube_sold" character varying NOT NULL, "start" character varying NOT NULL, "productsId" uuid, CONSTRAINT "REL_9fca6834fe56b98b5d5f299b43" UNIQUE ("productsId"), CONSTRAINT "PK_5ac626c80b8754f723851974fb8" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "Category" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_title" character varying(100) NOT NULL, CONSTRAINT "PK_0132db99add61303c1f236142bd" PRIMARY KEY ("category_id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "SubCategory" ("subCategory_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub_category_title" character varying(100) NOT NULL, "categoryId" uuid, CONSTRAINT "PK_b67293639346c7a4c4665329a25" PRIMARY KEY ("subCategory_id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "Lower" ("lower_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lower_title" character varying NOT NULL, "subCategoryId" uuid, CONSTRAINT "PK_90872e27876f686a160192e0b41" PRIMARY KEY ("lower_id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "Products" ("products_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "protuctes_brend" character varying, "protuctes_brendname" character varying, "aftur" character varying, "protuctes_title" character varying, "protuctes_descirption" character varying, "protuctes_price" numeric, "yanginarhi" numeric NOT NULL DEFAULT \'0\', "protuctes_size" character varying, "protuctes_razmer" character varying, "protuctes_manufacturers_size" character varying, "packed_weight_kg" character varying, "img" character varying, "protuctes_rate" character varying, "chegirma" integer NOT NULL DEFAULT \'0\', "nechta_sotdi" integer NOT NULL DEFAULT \'0\', "lowerId" uuid, "korzinkaId" uuid, CONSTRAINT "PK_aaff6eded8fa197d733e8fd4bce" PRIMARY KEY ("products_id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "Comments" ("comments_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment_title" character varying NOT NULL, "productsId" uuid, "usersId" uuid, CONSTRAINT "PK_fbc115eb44b129760a7eb47c53f" PRIMARY KEY ("comments_id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "Darajasi" ADD CONSTRAINT "FK_d9275cfdbe9ce48577e38a83c03" FOREIGN KEY ("productsId") REFERENCES "Products"("products_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Korzinka" ADD CONSTRAINT "FK_0ed57b5eb709cceff7624a24aec" FOREIGN KEY ("productsId") REFERENCES "Products"("products_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Korzinka" ADD CONSTRAINT "FK_780223fa27b2c08418215263478" FOREIGN KEY ("usersId") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Level" ADD CONSTRAINT "FK_9fca6834fe56b98b5d5f299b437" FOREIGN KEY ("productsId") REFERENCES "Products"("products_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "SubCategory" ADD CONSTRAINT "FK_88e9eadc11095bb5fd216284855" FOREIGN KEY ("categoryId") REFERENCES "Category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Lower" ADD CONSTRAINT "FK_5e91de6cfcda214ac5819edc185" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("subCategory_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Products" ADD CONSTRAINT "FK_190c0e2a51d0bde88ce15ac50be" FOREIGN KEY ("lowerId") REFERENCES "Lower"("lower_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Products" ADD CONSTRAINT "FK_91bb43fc195d7faee92f4f5c847" FOREIGN KEY ("korzinkaId") REFERENCES "Korzinka"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Comments" ADD CONSTRAINT "FK_3882b7d07c3a921d4a16bb68dbd" FOREIGN KEY ("productsId") REFERENCES "Products"("products_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "Comments" ADD CONSTRAINT "FK_ed9584f2c8d29c61b2bbdde68dd" FOREIGN KEY ("usersId") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Comments" DROP CONSTRAINT "FK_ed9584f2c8d29c61b2bbdde68dd"')
    await queryRunner.query('ALTER TABLE "Comments" DROP CONSTRAINT "FK_3882b7d07c3a921d4a16bb68dbd"')
    await queryRunner.query('ALTER TABLE "Products" DROP CONSTRAINT "FK_91bb43fc195d7faee92f4f5c847"')
    await queryRunner.query('ALTER TABLE "Products" DROP CONSTRAINT "FK_190c0e2a51d0bde88ce15ac50be"')
    await queryRunner.query('ALTER TABLE "Lower" DROP CONSTRAINT "FK_5e91de6cfcda214ac5819edc185"')
    await queryRunner.query('ALTER TABLE "SubCategory" DROP CONSTRAINT "FK_88e9eadc11095bb5fd216284855"')
    await queryRunner.query('ALTER TABLE "Level" DROP CONSTRAINT "FK_9fca6834fe56b98b5d5f299b437"')
    await queryRunner.query('ALTER TABLE "Korzinka" DROP CONSTRAINT "FK_780223fa27b2c08418215263478"')
    await queryRunner.query('ALTER TABLE "Korzinka" DROP CONSTRAINT "FK_0ed57b5eb709cceff7624a24aec"')
    await queryRunner.query('ALTER TABLE "Darajasi" DROP CONSTRAINT "FK_d9275cfdbe9ce48577e38a83c03"')
    await queryRunner.query('DROP TABLE "Comments"')
    await queryRunner.query('DROP TABLE "Products"')
    await queryRunner.query('DROP TABLE "Lower"')
    await queryRunner.query('DROP TABLE "SubCategory"')
    await queryRunner.query('DROP TABLE "Category"')
    await queryRunner.query('DROP TABLE "Level"')
    await queryRunner.query('DROP TABLE "Korzinka"')
    await queryRunner.query('DROP TABLE "Users"')
    await queryRunner.query('DROP TABLE "Darajasi"')
  }
}
