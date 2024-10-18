/*
  Warnings:

  - The `theorical` column on the `assing_general_competence_edit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `practice` column on the `assing_general_competence_edit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `competence_theme` on the `assing_general_data_subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "initial_data_subject" DROP CONSTRAINT "initial_data_subject_general_data_subject_id_fkey";

-- AlterTable
ALTER TABLE "assing_general_competence_edit" DROP COLUMN "theorical",
ADD COLUMN     "theorical" INTEGER,
DROP COLUMN "practice",
ADD COLUMN     "practice" INTEGER;

-- AlterTable
ALTER TABLE "assing_general_data_subject" DROP COLUMN "competence_theme",
ADD COLUMN     "assing_initial_data_subject_id" INTEGER;

-- AddForeignKey
ALTER TABLE "initial_data_subject" ADD CONSTRAINT "initial_data_subject_general_data_subject_id_fkey" FOREIGN KEY ("general_data_subject_id") REFERENCES "general_data_subject"("id_general_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_general_data_subject" ADD CONSTRAINT "assing_general_data_subject_assing_initial_data_subject_id_fkey" FOREIGN KEY ("assing_initial_data_subject_id") REFERENCES "assing_initial_data_subject"("id_initial_data_subject") ON DELETE SET NULL ON UPDATE CASCADE;
