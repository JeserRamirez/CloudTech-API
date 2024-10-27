/*
  Warnings:

  - Added the required column `total_amount_to_pay` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicant_payment_inscription" ADD COLUMN     "total_amount_to_pay" DECIMAL(65,30) NOT NULL;
