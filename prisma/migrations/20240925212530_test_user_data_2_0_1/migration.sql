/*
  Warnings:

  - You are about to drop the column `id_general_data` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `id_preventive_data` on the `general_data` table. All the data in the column will be lost.
  - You are about to drop the column `id_scholar_data` on the `general_data` table. All the data in the column will be lost.
  - You are about to drop the column `id_student_kardex_plan` on the `general_data` table. All the data in the column will be lost.
  - You are about to drop the column `id_student_personal_data` on the `general_data` table. All the data in the column will be lost.
  - You are about to drop the column `id_student_tutor_data` on the `general_data` table. All the data in the column will be lost.
  - You are about to drop the column `id_general_data` on the `student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "applicant" DROP CONSTRAINT "applicant_id_general_data_fkey";

-- DropForeignKey
ALTER TABLE "general_data" DROP CONSTRAINT "general_data_id_preventive_data_fkey";

-- DropForeignKey
ALTER TABLE "general_data" DROP CONSTRAINT "general_data_id_scholar_data_fkey";

-- DropForeignKey
ALTER TABLE "general_data" DROP CONSTRAINT "general_data_id_student_kardex_plan_fkey";

-- DropForeignKey
ALTER TABLE "general_data" DROP CONSTRAINT "general_data_id_student_personal_data_fkey";

-- DropForeignKey
ALTER TABLE "general_data" DROP CONSTRAINT "general_data_id_student_tutor_data_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_id_general_data_fkey";

-- DropIndex
DROP INDEX "applicant_id_general_data_key";

-- DropIndex
DROP INDEX "general_data_id_preventive_data_key";

-- DropIndex
DROP INDEX "general_data_id_scholar_data_key";

-- DropIndex
DROP INDEX "general_data_id_student_kardex_plan_key";

-- DropIndex
DROP INDEX "general_data_id_student_personal_data_key";

-- DropIndex
DROP INDEX "general_data_id_student_tutor_data_key";

-- DropIndex
DROP INDEX "student_id_general_data_key";

-- AlterTable
ALTER TABLE "applicant" DROP COLUMN "id_general_data";

-- AlterTable
ALTER TABLE "general_data" DROP COLUMN "id_preventive_data",
DROP COLUMN "id_scholar_data",
DROP COLUMN "id_student_kardex_plan",
DROP COLUMN "id_student_personal_data",
DROP COLUMN "id_student_tutor_data",
ADD COLUMN     "applicant_id" INTEGER,
ADD COLUMN     "student_id" INTEGER;

-- AlterTable
ALTER TABLE "preventive_data" ADD COLUMN     "general_data_id" INTEGER;

-- AlterTable
ALTER TABLE "scholar_data" ADD COLUMN     "general_data_id" INTEGER;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "id_general_data";

-- AlterTable
ALTER TABLE "student_kardex_plan" ADD COLUMN     "general_data_id" INTEGER;

-- AlterTable
ALTER TABLE "student_personal_data" ADD COLUMN     "general_data_id" INTEGER;

-- AlterTable
ALTER TABLE "student_tutor_data" ADD COLUMN     "general_data_id" INTEGER;

-- AddForeignKey
ALTER TABLE "general_data" ADD CONSTRAINT "general_data_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("applicant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_data" ADD CONSTRAINT "general_data_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preventive_data" ADD CONSTRAINT "preventive_data_general_data_id_fkey" FOREIGN KEY ("general_data_id") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_personal_data" ADD CONSTRAINT "student_personal_data_general_data_id_fkey" FOREIGN KEY ("general_data_id") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tutor_data" ADD CONSTRAINT "student_tutor_data_general_data_id_fkey" FOREIGN KEY ("general_data_id") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_kardex_plan" ADD CONSTRAINT "student_kardex_plan_general_data_id_fkey" FOREIGN KEY ("general_data_id") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholar_data" ADD CONSTRAINT "scholar_data_general_data_id_fkey" FOREIGN KEY ("general_data_id") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;
