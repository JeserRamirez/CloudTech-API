-- AlterTable
ALTER TABLE "student_enrollment" ADD COLUMN     "id_reinscription_date" INTEGER;

-- CreateTable
CREATE TABLE "reinscription_date" (
    "id_reinscription_date" SERIAL NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "deadline" TIMESTAMP(6) NOT NULL,
    "period_id" INTEGER NOT NULL,

    CONSTRAINT "reinscription_date_pkey" PRIMARY KEY ("id_reinscription_date")
);

-- AddForeignKey
ALTER TABLE "student_enrollment" ADD CONSTRAINT "student_enrollment_id_reinscription_date_fkey" FOREIGN KEY ("id_reinscription_date") REFERENCES "reinscription_date"("id_reinscription_date") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reinscription_date" ADD CONSTRAINT "reinscription_date_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE CASCADE;
