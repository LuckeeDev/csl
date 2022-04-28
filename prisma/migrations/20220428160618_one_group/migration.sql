/*
  Warnings:

  - You are about to drop the `_groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_groups" DROP CONSTRAINT "_groups_A_fkey";

-- DropForeignKey
ALTER TABLE "_groups" DROP CONSTRAINT "_groups_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "groupId" TEXT;

-- DropTable
DROP TABLE "_groups";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
