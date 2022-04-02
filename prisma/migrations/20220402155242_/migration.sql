/*
  Warnings:

  - You are about to drop the `ServiceAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceAccount" DROP CONSTRAINT "ServiceAccount_userId_fkey";

-- DropTable
DROP TABLE "ServiceAccount";
