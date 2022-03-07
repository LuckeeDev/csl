/*
  Warnings:

  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "color",
ADD COLUMN     "colors" TEXT[];
