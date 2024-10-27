/*
  Warnings:

  - You are about to drop the column `total_amount_to_pay` on the `applicant_payment_inscription` table. All the data in the column will be lost.
  - Added the required column `total_amount_to_pay` to the `fees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicant_payment_inscription" DROP COLUMN "total_amount_to_pay";

-- AlterTable
ALTER TABLE "fees" ADD COLUMN     "total_amount_to_pay" DECIMAL(65,30) NOT NULL;
