/*
  Warnings:

  - You are about to drop the column `curp` on the `student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "student_curp_key";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "curp";
