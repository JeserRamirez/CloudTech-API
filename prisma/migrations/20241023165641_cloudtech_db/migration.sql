-- DropForeignKey
ALTER TABLE "applicant_payment_token" DROP CONSTRAINT "applicant_payment_token_fees_id_fkey";

-- DropForeignKey
ALTER TABLE "fees" DROP CONSTRAINT "fees_period_id_fkey";

-- AddForeignKey
ALTER TABLE "applicant_payment_token" ADD CONSTRAINT "applicant_payment_token_fees_id_fkey" FOREIGN KEY ("fees_id") REFERENCES "fees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fees" ADD CONSTRAINT "fees_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE CASCADE;
