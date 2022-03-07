-- CreateEnum
CREATE TYPE "ProductSizes" AS ENUM ('XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT[],
ADD COLUMN     "sizes" "ProductSizes"[];
