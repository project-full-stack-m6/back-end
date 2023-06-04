-- AlterTable
CREATE SEQUENCE wallets_id_seq;
ALTER TABLE "Wallets" ALTER COLUMN "id" SET DEFAULT nextval('wallets_id_seq');
ALTER SEQUENCE wallets_id_seq OWNED BY "Wallets"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "users"."id";
