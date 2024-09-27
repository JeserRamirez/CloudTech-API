/*
  Warnings:

  - You are about to drop the column `applicantId` on the `preventive_data` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `preventive_data` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `scholar_data` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `scholar_data` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `student_kardex_plan` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `student_kardex_plan` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `student_personal_data` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `student_personal_data` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `student_tutor_data` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `student_tutor_data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_general_data]` on the table `applicant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_general_data]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_general_data` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_general_data` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "preventive_data" DROP CONSTRAINT "preventive_data_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "preventive_data" DROP CONSTRAINT "preventive_data_studentId_fkey";

-- DropForeignKey
ALTER TABLE "scholar_data" DROP CONSTRAINT "scholar_data_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "scholar_data" DROP CONSTRAINT "scholar_data_studentId_fkey";

-- DropForeignKey
ALTER TABLE "student_kardex_plan" DROP CONSTRAINT "student_kardex_plan_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "student_kardex_plan" DROP CONSTRAINT "student_kardex_plan_studentId_fkey";

-- DropForeignKey
ALTER TABLE "student_personal_data" DROP CONSTRAINT "student_personal_data_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "student_personal_data" DROP CONSTRAINT "student_personal_data_studentId_fkey";

-- DropForeignKey
ALTER TABLE "student_tutor_data" DROP CONSTRAINT "student_tutor_data_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "student_tutor_data" DROP CONSTRAINT "student_tutor_data_studentId_fkey";

-- AlterTable
ALTER TABLE "applicant" ADD COLUMN     "id_general_data" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "preventive_data" DROP COLUMN "applicantId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "scholar_data" DROP COLUMN "applicantId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "id_general_data" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "student_kardex_plan" DROP COLUMN "applicantId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "student_personal_data" DROP COLUMN "applicantId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "student_tutor_data" DROP COLUMN "applicantId",
DROP COLUMN "studentId";

-- CreateTable
CREATE TABLE "general_data" (
    "id_general_data" SERIAL NOT NULL,
    "id_preventive_data" INTEGER NOT NULL,
    "id_student_personal_data" INTEGER NOT NULL,
    "id_student_tutor_data" INTEGER NOT NULL,
    "id_student_kardex_plan" INTEGER NOT NULL,
    "id_scholar_data" INTEGER NOT NULL,

    CONSTRAINT "general_data_pkey" PRIMARY KEY ("id_general_data")
);

-- CreateIndex
CREATE UNIQUE INDEX "general_data_id_preventive_data_key" ON "general_data"("id_preventive_data");

-- CreateIndex
CREATE UNIQUE INDEX "general_data_id_student_personal_data_key" ON "general_data"("id_student_personal_data");

-- CreateIndex
CREATE UNIQUE INDEX "general_data_id_student_tutor_data_key" ON "general_data"("id_student_tutor_data");

-- CreateIndex
CREATE UNIQUE INDEX "general_data_id_student_kardex_plan_key" ON "general_data"("id_student_kardex_plan");

-- CreateIndex
CREATE UNIQUE INDEX "general_data_id_scholar_data_key" ON "general_data"("id_scholar_data");

-- CreateIndex
CREATE UNIQUE INDEX "applicant_id_general_data_key" ON "applicant"("id_general_data");

-- CreateIndex
CREATE UNIQUE INDEX "student_id_general_data_key" ON "student"("id_general_data");

-- AddForeignKey
ALTER TABLE "applicant" ADD CONSTRAINT "applicant_id_general_data_fkey" FOREIGN KEY ("id_general_data") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_id_general_data_fkey" FOREIGN KEY ("id_general_data") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_data" ADD CONSTRAINT "general_data_id_preventive_data_fkey" FOREIGN KEY ("id_preventive_data") REFERENCES "preventive_data"("id_preventive_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_data" ADD CONSTRAINT "general_data_id_student_personal_data_fkey" FOREIGN KEY ("id_student_personal_data") REFERENCES "student_personal_data"("id_student_personal_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_data" ADD CONSTRAINT "general_data_id_student_tutor_data_fkey" FOREIGN KEY ("id_student_tutor_data") REFERENCES "student_tutor_data"("id_student_tutor_data") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_data" ADD CONSTRAINT "general_data_id_student_kardex_plan_fkey" FOREIGN KEY ("id_student_kardex_plan") REFERENCES "student_kardex_plan"("id_kardex") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_data" ADD CONSTRAINT "general_data_id_scholar_data_fkey" FOREIGN KEY ("id_scholar_data") REFERENCES "scholar_data"("id_scholar_data") ON DELETE CASCADE ON UPDATE CASCADE;
