-- CreateTable
CREATE TABLE "ServiceAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ServiceAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAccount_email_key" ON "ServiceAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAccount_userId_key" ON "ServiceAccount"("userId");

-- AddForeignKey
ALTER TABLE "ServiceAccount" ADD CONSTRAINT "ServiceAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
