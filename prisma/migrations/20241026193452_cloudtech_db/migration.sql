/*
  Warnings:

  - A unique constraint covering the columns `[folio]` on the table `applicant_payment_token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pre_application_token]` on the table `applicant_payment_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applicant_payment_token_folio_key" ON "applicant_payment_token"("folio");

-- CreateIndex
CREATE UNIQUE INDEX "applicant_payment_token_pre_application_token_key" ON "applicant_payment_token"("pre_application_token");
