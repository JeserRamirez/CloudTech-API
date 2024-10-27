-- AlterTable
ALTER TABLE "applicant_payment_inscription" ADD COLUMN     "fees_id" INTEGER;

-- AlterTable
ALTER TABLE "applicant_payment_token" ADD COLUMN     "fees_id" INTEGER;

-- CreateTable
CREATE TABLE "fees" (
    "id" SERIAL NOT NULL,
    "fee_type" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "period_id" INTEGER NOT NULL,

    CONSTRAINT "fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "period" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "period_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applicant_payment_token" ADD CONSTRAINT "applicant_payment_token_fees_id_fkey" FOREIGN KEY ("fees_id") REFERENCES "fees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicant_payment_inscription" ADD CONSTRAINT "applicant_payment_inscription_fees_id_fkey" FOREIGN KEY ("fees_id") REFERENCES "fees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fees" ADD CONSTRAINT "fees_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
