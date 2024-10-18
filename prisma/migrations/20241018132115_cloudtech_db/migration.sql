/*
  Warnings:

  - You are about to drop the column `city` on the `student_personal_data` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `student_tutor_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student_personal_data" DROP COLUMN "city";

-- AlterTable
ALTER TABLE "student_tutor_data" DROP COLUMN "city";
