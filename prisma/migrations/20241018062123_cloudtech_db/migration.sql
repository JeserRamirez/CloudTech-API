/*
  Warnings:

  - You are about to drop the `_assing_data_subjectToassing_initial_data_subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_assing_data_subjectToassing_initial_data_subject" DROP CONSTRAINT "_assing_data_subjectToassing_initial_data_subject_A_fkey";

-- DropForeignKey
ALTER TABLE "_assing_data_subjectToassing_initial_data_subject" DROP CONSTRAINT "_assing_data_subjectToassing_initial_data_subject_B_fkey";

-- AlterTable
ALTER TABLE "assing_data_subject" ADD COLUMN     "assing_initial_data_subject_id" INTEGER;

-- AlterTable
ALTER TABLE "initial_data_subject" ADD COLUMN     "general_competence_edit_id" INTEGER;

-- DropTable
DROP TABLE "_assing_data_subjectToassing_initial_data_subject";

-- AddForeignKey
ALTER TABLE "initial_data_subject" ADD CONSTRAINT "initial_data_subject_general_competence_edit_id_fkey" FOREIGN KEY ("general_competence_edit_id") REFERENCES "general_competence_edit"("id_general_competence_edit") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_data_subject" ADD CONSTRAINT "assing_data_subject_assing_initial_data_subject_id_fkey" FOREIGN KEY ("assing_initial_data_subject_id") REFERENCES "assing_initial_data_subject"("id_initial_data_subject") ON DELETE SET NULL ON UPDATE CASCADE;
