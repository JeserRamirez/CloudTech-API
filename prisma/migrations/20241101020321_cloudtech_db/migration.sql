/*
  Warnings:

  - You are about to drop the column `ficha` on the `examn_applicant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "examn_applicant_ficha_key";

-- AlterTable
ALTER TABLE "examn_applicant" DROP COLUMN "ficha";
