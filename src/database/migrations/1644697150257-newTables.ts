import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1644697150257 implements MigrationInterface {
    name = 'newTables1644697150257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "productId" character varying NOT NULL, "cartId" character varying NOT NULL, CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "isAdm" boolean NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" numeric(5,2) NOT NULL DEFAULT '0', "paid" boolean NOT NULL DEFAULT false, "ownerId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(5,2) NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_carts_cart" ("usersId" uuid NOT NULL, "cartId" uuid NOT NULL, CONSTRAINT "PK_39dc14bc88f1dabd7e32d2f5e67" PRIMARY KEY ("usersId", "cartId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a879904db8e87e410406fd3a4e" ON "users_carts_cart" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fea74994cd8b499105ab98be4e" ON "users_carts_cart" ("cartId") `);
        await queryRunner.query(`CREATE TABLE "cart_products_cart_product" ("cartId" uuid NOT NULL, "cartProductId" uuid NOT NULL, CONSTRAINT "PK_1c1397a8e94e5a263ee7c9e2282" PRIMARY KEY ("cartId", "cartProductId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7da1c83633a407dd7c457621d0" ON "cart_products_cart_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1adcd27156baead5d9f0c0d9d1" ON "cart_products_cart_product" ("cartProductId") `);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_74437c8abe0038366cda005444d" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_carts_cart" ADD CONSTRAINT "FK_a879904db8e87e410406fd3a4e6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_carts_cart" ADD CONSTRAINT "FK_fea74994cd8b499105ab98be4ea" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_cart_product" ADD CONSTRAINT "FK_7da1c83633a407dd7c457621d02" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_cart_product" ADD CONSTRAINT "FK_1adcd27156baead5d9f0c0d9d12" FOREIGN KEY ("cartProductId") REFERENCES "cart_product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_cart_product" DROP CONSTRAINT "FK_1adcd27156baead5d9f0c0d9d12"`);
        await queryRunner.query(`ALTER TABLE "cart_products_cart_product" DROP CONSTRAINT "FK_7da1c83633a407dd7c457621d02"`);
        await queryRunner.query(`ALTER TABLE "users_carts_cart" DROP CONSTRAINT "FK_fea74994cd8b499105ab98be4ea"`);
        await queryRunner.query(`ALTER TABLE "users_carts_cart" DROP CONSTRAINT "FK_a879904db8e87e410406fd3a4e6"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_74437c8abe0038366cda005444d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1adcd27156baead5d9f0c0d9d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7da1c83633a407dd7c457621d0"`);
        await queryRunner.query(`DROP TABLE "cart_products_cart_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fea74994cd8b499105ab98be4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a879904db8e87e410406fd3a4e"`);
        await queryRunner.query(`DROP TABLE "users_carts_cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
    }

}
