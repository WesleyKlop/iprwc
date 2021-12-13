/*
  Warnings:

  - Added the required column `city` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
