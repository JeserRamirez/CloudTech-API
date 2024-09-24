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
ADD COLUMN     "applicantId" TEXT,
ADD COLUMN     "id_preventive_data" SERIAL NOT NULL,
ADD COLUMN     "studentId" TEXT,
ADD CONSTRAINT "preventive_data_pkey" PRIMARY KEY ("id_preventive_data");

-- AlterTable
ALTER TABLE "student_personal_data" DROP CONSTRAINT "student_personal_data_pkey",
DROP COLUMN "id_student",
ADD COLUMN     "applicantId" TEXT,
ADD COLUMN     "id_student_personal_data" SERIAL NOT NULL,
ADD COLUMN     "studentId" TEXT,
ADD CONSTRAINT "student_personal_data_pkey" PRIMARY KEY ("id_student_personal_data");

-- AlterTable
ALTER TABLE "student_tutor_data" DROP CONSTRAINT "student_tutor_data_pkey",
DROP COLUMN "id_student",
ADD COLUMN     "applicantId" TEXT,
ADD COLUMN     "id_student_tutor_data" SERIAL NOT NULL,
ADD COLUMN     "studentId" TEXT,
ADD CONSTRAINT "student_tutor_data_pkey" PRIMARY KEY ("id_student_tutor_data");

-- AlterTable
ALTER TABLE "teacher_personal_data" DROP CONSTRAINT "teacher_personal_data_pkey",
ADD COLUMN     "id_teacher_personal_data" SERIAL NOT NULL,
ADD CONSTRAINT "teacher_personal_data_pkey" PRIMARY KEY ("id_teacher_personal_data");

-- CreateIndex
CREATE UNIQUE INDEX "job_data_id_teacher_number_key" ON "job_data"("id_teacher_number");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_personal_data_id_teacher_number_key" ON "teacher_personal_data"("id_teacher_number");

-- AddForeignKey
ALTER TABLE "preventive_data" ADD CONSTRAINT "preventive_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preventive_data" ADD CONSTRAINT "preventive_data_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("control_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_personal_data" ADD CONSTRAINT "student_personal_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_personal_data" ADD CONSTRAINT "student_personal_data_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("control_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tutor_data" ADD CONSTRAINT "student_tutor_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tutor_data" ADD CONSTRAINT "student_tutor_data_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("control_number") ON DELETE SET NULL ON UPDATE CASCADE;
