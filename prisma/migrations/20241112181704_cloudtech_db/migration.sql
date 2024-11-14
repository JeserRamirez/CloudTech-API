/*
  Warnings:

  - You are about to drop the `student_courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_courses" DROP CONSTRAINT "student_courses_class_schedule_id_fkey";

-- AlterTable
ALTER TABLE "evaluation_feedback" ADD COLUMN     "student_current_class_id" INTEGER;

-- DropTable
DROP TABLE "student_courses";

-- AddForeignKey
ALTER TABLE "evaluation_feedback" ADD CONSTRAINT "evaluation_feedback_student_current_class_id_fkey" FOREIGN KEY ("student_current_class_id") REFERENCES "student_current_class"("id_current_class") ON DELETE CASCADE ON UPDATE CASCADE;
