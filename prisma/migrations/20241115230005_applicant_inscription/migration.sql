/*
  Warnings:

  - You are about to drop the column `payment_data` on the `applicant_payment_inscription` table. All the data in the column will be lost.
  - Added the required column `payment_method` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference_number` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicant_payment_inscription" DROP COLUMN "payment_data",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "inscription_request_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payment_method" VARCHAR(255) NOT NULL,
ADD COLUMN     "reference_number" VARCHAR(255) NOT NULL,
ADD COLUMN     "state" VARCHAR(255) NOT NULL,
ADD COLUMN     "total_amount_to_pay" DECIMAL(10,2),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
