/*
  Warnings:

  - A unique constraint covering the columns `[inscription_token]` on the table `applicant_payment_inscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "applicant_payment_inscription" ADD COLUMN     "inscription_token" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "applicant_payment_inscription_inscription_token_key" ON "applicant_payment_inscription"("inscription_token");
