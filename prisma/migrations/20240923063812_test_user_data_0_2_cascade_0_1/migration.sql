-- DropForeignKey
ALTER TABLE "preventive_data" DROP CONSTRAINT "preventive_data_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "scholar_data" DROP CONSTRAINT "scholar_data_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "student_kardex_plan" DROP CONSTRAINT "student_kardex_plan_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "student_personal_data" DROP CONSTRAINT "student_personal_data_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "student_tutor_data" DROP CONSTRAINT "student_tutor_data_applicantId_fkey";

-- AddForeignKey
ALTER TABLE "preventive_data" ADD CONSTRAINT "preventive_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_personal_data" ADD CONSTRAINT "student_personal_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tutor_data" ADD CONSTRAINT "student_tutor_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_kardex_plan" ADD CONSTRAINT "student_kardex_plan_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholar_data" ADD CONSTRAINT "scholar_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;
