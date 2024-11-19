/*
  Warnings:

  - Added the required column `student_id` to the `evaluation_feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evaluation_feedback" ADD COLUMN     "student_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "evaluation_feedback" ADD CONSTRAINT "evaluation_feedback_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
