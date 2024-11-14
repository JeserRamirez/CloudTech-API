/*
  Warnings:

  - You are about to drop the column `period` on the `student_complementary_activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student_complementary_activities" DROP COLUMN "period",
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DATA TYPE VARCHAR;
