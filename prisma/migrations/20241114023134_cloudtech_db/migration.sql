/*
  Warnings:

  - A unique constraint covering the columns `[applicant_id]` on the table `applicant_payment_inscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applicant_payment_inscription_applicant_id_key" ON "applicant_payment_inscription"("applicant_id");
