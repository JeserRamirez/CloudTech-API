/*
  Warnings:

  - You are about to drop the column `competence_theme` on the `general_data_subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "general_data_subject" DROP COLUMN "competence_theme";

-- AlterTable
ALTER TABLE "initial_data_subject" ADD COLUMN     "general_data_subject_id" INTEGER;

-- AddForeignKey
ALTER TABLE "initial_data_subject" ADD CONSTRAINT "initial_data_subject_general_data_subject_id_fkey" FOREIGN KEY ("general_data_subject_id") REFERENCES "general_data_subject"("id_general_data_subject") ON DELETE SET NULL ON UPDATE CASCADE;
