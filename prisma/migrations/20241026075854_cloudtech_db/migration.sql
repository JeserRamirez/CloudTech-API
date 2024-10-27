/*
  Warnings:

  - You are about to alter the column `total_amount_to_pay` on the `applicant_payment_token` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `fees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `discount` on the `fees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "applicant_payment_token" ALTER COLUMN "total_amount_to_pay" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "fees" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(10,2);
