/*
  Warnings:

  - The `birthdate` column on the `student_personal_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "student_personal_data" DROP COLUMN "birthdate",
ADD COLUMN     "birthdate" TIMESTAMP(6);
