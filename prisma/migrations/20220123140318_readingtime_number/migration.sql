/*
  Warnings:

  - Changed the type of `readingTime` on the `Article` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "readingTime",
ADD COLUMN     "readingTime" INTEGER NOT NULL;
