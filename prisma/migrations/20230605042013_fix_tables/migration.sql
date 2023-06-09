/*
  Warnings:

  - You are about to drop the column `wallet_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Wallets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallets" DROP CONSTRAINT "Wallets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_wallet_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "wallet_id";

-- DropTable
DROP TABLE "Wallets";

-- CreateTable
CREATE TABLE "wallets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContactsOnWallet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "wallets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsOnWallet_AB_unique" ON "_ContactsOnWallet"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsOnWallet_B_index" ON "_ContactsOnWallet"("B");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsOnWallet" ADD CONSTRAINT "_ContactsOnWallet_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsOnWallet" ADD CONSTRAINT "_ContactsOnWallet_B_fkey" FOREIGN KEY ("B") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
