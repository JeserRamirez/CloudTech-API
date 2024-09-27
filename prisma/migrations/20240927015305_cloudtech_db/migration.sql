/*
  Warnings:

  - The primary key for the `job_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `preventive_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_student` on the `preventive_data` table. All the data in the column will be lost.
  - The primary key for the `student_personal_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_student` on the `student_personal_data` table. All the data in the column will be lost.
  - The primary key for the `student_tutor_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_student` on the `student_tutor_data` table. All the data in the column will be lost.
  - The primary key for the `teacher_personal_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id_teacher_number]` on the table `job_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[curp]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_teacher_number]` on the table `teacher_personal_data` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "preventive_data" DROP CONSTRAINT "preventive_data_id_student_fkey";

-- DropForeignKey
ALTER TABLE "student_personal_data" DROP CONSTRAINT "student_personal_data_id_student_fkey";

-- DropForeignKey
ALTER TABLE "student_tutor_data" DROP CONSTRAINT "student_tutor_data_id_student_fkey";

-- AlterTable
ALTER TABLE "job_data" DROP CONSTRAINT "job_data_pkey",
ADD COLUMN     "id_job_data" SERIAL NOT NULL,
ADD CONSTRAINT "job_data_pkey" PRIMARY KEY ("id_job_data");

-- AlterTable
ALTER TABLE "preventive_data" DROP CONSTRAINT "preventive_data_pkey",
DROP COLUMN "id_student",
ADD COLUMN     "general_data_id" INTEGER,
ADD COLUMN     "id_preventive_data" SERIAL NOT NULL,
ADD CONSTRAINT "preventive_data_pkey" PRIMARY KEY ("id_preventive_data");

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "curp" VARCHAR(18);

-- AlterTable
ALTER TABLE "student_personal_data" DROP CONSTRAINT "student_personal_data_pkey",
DROP COLUMN "id_student",
ADD COLUMN     "general_data_id" INTEGER,
ADD COLUMN     "id_student_personal_data" SERIAL NOT NULL,
ADD CONSTRAINT "student_personal_data_pkey" PRIMARY KEY ("id_student_personal_data");

-- AlterTable
ALTER TABLE "student_tutor_data" DROP CONSTRAINT "student_tutor_data_pkey",
DROP COLUMN "id_student",
ADD COLUMN     "general_data_id" INTEGER,
ADD COLUMN     "id_student_tutor_data" SERIAL NOT NULL,
ADD CONSTRAINT "student_tutor_data_pkey" PRIMARY KEY ("id_student_tutor_data");

-- AlterTable
ALTER TABLE "teacher_personal_data" DROP CONSTRAINT "teacher_personal_data_pkey",
ADD COLUMN     "id_teacher_personal_data" SERIAL NOT NULL,
ADD CONSTRAINT "teacher_personal_data_pkey" PRIMARY KEY ("id_teacher_personal_data");

-- CreateTable
CREATE TABLE "general_data" (
    "id_general_data" SERIAL NOT NULL,
    "applicant_id" INTEGER,
    "student_id" INTEGER,

    CONSTRAINT "general_data_pkey" PRIMARY KEY ("id_general_data")
);

-- CreateTable
CREATE TABLE "student_kardex_plan" (
    "id_kardex" SERIAL NOT NULL,
    "id_plan_relation" INTEGER NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "end_semester" INTEGER NOT NULL,
    "general_data_id" INTEGER,

    CONSTRAINT "student_kardex_plan_pkey" PRIMARY KEY ("id_kardex")
);

-- CreateTable
CREATE TABLE "scholar_data" (
    "id_scholar_data" SERIAL NOT NULL,
    "school_prev" TEXT,
    "graduation_period" TEXT,
    "validate_periods" BOOLEAN NOT NULL,
    "current_period" TEXT,
    "accumulated_credits" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "general_data_id" INTEGER,

    CONSTRAINT "scholar_data_pkey" PRIMARY KEY ("id_scholar_data")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_data_id_teacher_number_key" ON "job_data"("id_teacher_number");

-- CreateIndex
CREATE UNIQUE INDEX "student_curp_key" ON "student"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_personal_data_id_teacher_number_key" ON "teacher_personal_data"("id_teacher_number");

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
