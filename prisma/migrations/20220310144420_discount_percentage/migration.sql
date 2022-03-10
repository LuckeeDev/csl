/*
  Warnings:

  - Added the required column `discountPercentage` to the `ProductDiscount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductDiscount" ADD COLUMN     "discountPercentage" INTEGER NOT NULL;
