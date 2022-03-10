-- CreateTable
CREATE TABLE "ProductDiscount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shopSessionId" TEXT NOT NULL,
    "requiredCategoryId" TEXT NOT NULL,
    "requiredQuantity" INTEGER NOT NULL,
    "discountedCategoryId" TEXT NOT NULL,
    "discountedQuantity" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductDiscount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductDiscount" ADD CONSTRAINT "ProductDiscount_requiredCategoryId_fkey" FOREIGN KEY ("requiredCategoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDiscount" ADD CONSTRAINT "ProductDiscount_discountedCategoryId_fkey" FOREIGN KEY ("discountedCategoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDiscount" ADD CONSTRAINT "ProductDiscount_shopSessionId_fkey" FOREIGN KEY ("shopSessionId") REFERENCES "ShopSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
