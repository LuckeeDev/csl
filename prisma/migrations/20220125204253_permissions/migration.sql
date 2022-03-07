-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('NEWS_EDITOR');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "permissions" "Permissions"[];
