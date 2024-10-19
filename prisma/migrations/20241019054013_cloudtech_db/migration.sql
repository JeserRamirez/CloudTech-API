/*
  Warnings:

  - You are about to drop the column `curp` on the `applicant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "applicant_curp_key";

-- AlterTable
ALTER TABLE "applicant" DROP COLUMN "curp";
