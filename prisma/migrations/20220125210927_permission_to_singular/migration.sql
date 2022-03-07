/*
  Warnings:

  - The `permissions` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('NEWS_EDITOR');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissions",
ADD COLUMN     "permissions" "Permission"[];

-- DropEnum
DROP TYPE "Permissions";
