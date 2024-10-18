/*
  Warnings:

  - The `theorical` column on the `general_competence_edit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `practice` column on the `general_competence_edit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "general_competence_edit" DROP COLUMN "theorical",
ADD COLUMN     "theorical" INTEGER,
DROP COLUMN "practice",
ADD COLUMN     "practice" INTEGER;
