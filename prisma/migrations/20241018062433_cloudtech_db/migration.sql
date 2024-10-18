-- DropForeignKey
ALTER TABLE "initial_data_subject" DROP CONSTRAINT "initial_data_subject_general_competence_edit_id_fkey";

-- AlterTable
ALTER TABLE "assing_initial_data_subject" ADD COLUMN     "assing_general_competence_edit_id" INTEGER;

-- AddForeignKey
ALTER TABLE "initial_data_subject" ADD CONSTRAINT "initial_data_subject_general_competence_edit_id_fkey" FOREIGN KEY ("general_competence_edit_id") REFERENCES "general_competence_edit"("id_general_competence_edit") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_initial_data_subject" ADD CONSTRAINT "assing_initial_data_subject_assing_general_competence_edit_fkey" FOREIGN KEY ("assing_general_competence_edit_id") REFERENCES "assing_general_competence_edit"("id_general_competence_edit") ON DELETE CASCADE ON UPDATE CASCADE;
