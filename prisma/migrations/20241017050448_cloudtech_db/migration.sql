/*
  Warnings:

  - The `start_time` column on the `class_schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_time` column on the `class_schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "class_schedule" DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIMESTAMP(1),
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIMESTAMP(1);
