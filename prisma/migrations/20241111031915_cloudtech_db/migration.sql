/*
  Warnings:

  - You are about to drop the column `class_schedule_id` on the `evaluation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "evaluation" DROP CONSTRAINT "evaluation_class_schedule_id_fkey";

-- AlterTable
ALTER TABLE "evaluation" DROP COLUMN "class_schedule_id",
ADD COLUMN     "class_scheduleId_class_schedule" INTEGER;

-- AddForeignKey
ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_class_scheduleId_class_schedule_fkey" FOREIGN KEY ("class_scheduleId_class_schedule") REFERENCES "class_schedule"("id_class_schedule") ON DELETE SET NULL ON UPDATE CASCADE;
