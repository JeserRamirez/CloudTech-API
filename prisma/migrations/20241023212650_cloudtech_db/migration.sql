/*
  Warnings:

  - You are about to drop the column `payment_data` on the `applicant_payment_token` table. All the data in the column will be lost.
  - Added the required column `total_amount_to_pay` to the `applicant_payment_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicant_payment_token" DROP COLUMN "payment_data",
ADD COLUMN     "career" VARCHAR(255),
ADD COLUMN     "career_model" VARCHAR(255),
ADD COLUMN     "folio" VARCHAR(255),
ADD COLUMN     "payment_method" VARCHAR(255),
ADD COLUMN     "pre_application_request_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reference_number" VARCHAR(255),
ADD COLUMN     "state" VARCHAR(255),
ADD COLUMN     "total_amount_to_pay" DECIMAL(65,30) NOT NULL;
