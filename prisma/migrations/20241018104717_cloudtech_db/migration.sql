/*
  Warnings:

  - You are about to drop the column `assing_data_subject_id` on the `class_schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "class_schedule" DROP CONSTRAINT "class_schedule_assing_data_subject_id_fkey";

-- AlterTable
ALTER TABLE "assing_data_subject" ADD COLUMN     "class_schedule_id" INTEGER;

-- AlterTable
ALTER TABLE "class_schedule" DROP COLUMN "assing_data_subject_id";

-- AddForeignKey
ALTER TABLE "assing_data_subject" ADD CONSTRAINT "assing_data_subject_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "class_schedule"("id_class_schedule") ON DELETE CASCADE ON UPDATE CASCADE;
