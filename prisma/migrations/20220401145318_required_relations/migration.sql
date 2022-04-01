/*
  Warnings:

  - Made the column `categoryId` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timeSlotId` on table `Seminar` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventId` on table `TimeSlot` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Seminar" ALTER COLUMN "timeSlotId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TimeSlot" ALTER COLUMN "eventId" SET NOT NULL;
