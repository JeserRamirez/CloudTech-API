/*
  Warnings:

  - The `teacher_id` column on the `class_schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "class_schedule" DROP CONSTRAINT "class_schedule_teacher_id_fkey";

-- AlterTable
ALTER TABLE "class_schedule" DROP COLUMN "teacher_id",
ADD COLUMN     "teacher_id" INTEGER;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;
