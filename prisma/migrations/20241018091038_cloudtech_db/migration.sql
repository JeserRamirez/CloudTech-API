/*
  Warnings:

  - You are about to drop the column `class_schedule_id` on the `assing_data_subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "assing_data_subject" DROP CONSTRAINT "assing_data_subject_class_schedule_id_fkey";

-- AlterTable
ALTER TABLE "assing_data_subject" DROP COLUMN "class_schedule_id";

-- AlterTable
ALTER TABLE "class_schedule" ADD COLUMN     "assing_data_subject_id" INTEGER;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_assing_data_subject_id_fkey" FOREIGN KEY ("assing_data_subject_id") REFERENCES "assing_data_subject"("id_assing_data_subject") ON DELETE SET NULL ON UPDATE CASCADE;
