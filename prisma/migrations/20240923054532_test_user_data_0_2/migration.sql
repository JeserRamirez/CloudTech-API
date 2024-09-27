/*
  Warnings:

  - A unique constraint covering the columns `[curp]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "curp" VARCHAR(18);

-- CreateTable
CREATE TABLE "student_kardex_plan" (
    "id_kardex" SERIAL NOT NULL,
    "id_plan_relation" INTEGER NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "end_semester" INTEGER NOT NULL,
    "applicantId" TEXT,
    "studentId" TEXT,

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
    "applicantId" TEXT,
    "studentId" TEXT,

    CONSTRAINT "scholar_data_pkey" PRIMARY KEY ("id_scholar_data")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_curp_key" ON "student"("curp");

-- AddForeignKey
ALTER TABLE "student_kardex_plan" ADD CONSTRAINT "student_kardex_plan_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_kardex_plan" ADD CONSTRAINT "student_kardex_plan_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("control_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholar_data" ADD CONSTRAINT "scholar_data_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicant"("curp") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholar_data" ADD CONSTRAINT "scholar_data_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("control_number") ON DELETE SET NULL ON UPDATE CASCADE;
