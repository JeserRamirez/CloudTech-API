/*
  Warnings:

  - You are about to drop the column `general_data_subject_id` on the `assing_general_competence_edit` table. All the data in the column will be lost.
  - You are about to drop the column `assing_initial_data_subject_id` on the `assing_general_data_subject` table. All the data in the column will be lost.
  - You are about to drop the column `assing_data_subject_id` on the `curse_following_grades_themes` table. All the data in the column will be lost.
  - You are about to drop the column `assing_general_data_subject_id` on the `grades_current` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "assing_general_competence_edit" DROP CONSTRAINT "assing_general_competence_edit_general_data_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "assing_general_data_subject" DROP CONSTRAINT "assing_general_data_subject_assing_initial_data_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "curse_following_grades_themes" DROP CONSTRAINT "curse_following_grades_themes_assing_data_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "grades_current" DROP CONSTRAINT "grades_current_assing_general_data_subject_id_fkey";

-- AlterTable
ALTER TABLE "assing_general_competence_edit" DROP COLUMN "general_data_subject_id",
ADD COLUMN     "assing_general_data_subject_id" INTEGER;

-- AlterTable
ALTER TABLE "assing_general_data_subject" DROP COLUMN "assing_initial_data_subject_id",
ADD COLUMN     "description_tag" VARCHAR;

-- AlterTable
ALTER TABLE "assing_initial_data_subject" ADD COLUMN     "assing_general_data_subject_id" INTEGER;

-- AlterTable
ALTER TABLE "curse_following_grades_themes" DROP COLUMN "assing_data_subject_id",
ADD COLUMN     "assing_general_data_subject_id" INTEGER;

-- AlterTable
ALTER TABLE "general_data_subject" ADD COLUMN     "description_tag" VARCHAR;

-- AlterTable
ALTER TABLE "grades_current" DROP COLUMN "assing_general_data_subject_id",
ADD COLUMN     "curse_following_grades_themes_id" INTEGER;

-- AlterTable
ALTER TABLE "student_current_class" ADD COLUMN     "student_id" INTEGER;

-- AddForeignKey
ALTER TABLE "student_current_class" ADD CONSTRAINT "student_current_class_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_initial_data_subject" ADD CONSTRAINT "assing_initial_data_subject_assing_general_data_subject_id_fkey" FOREIGN KEY ("assing_general_data_subject_id") REFERENCES "assing_general_data_subject"("id_general_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_general_competence_edit" ADD CONSTRAINT "assing_general_competence_edit_assing_general_data_subject_fkey" FOREIGN KEY ("assing_general_data_subject_id") REFERENCES "assing_general_data_subject"("id_general_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curse_following_grades_themes" ADD CONSTRAINT "curse_following_grades_themes_assing_general_data_subject__fkey" FOREIGN KEY ("assing_general_data_subject_id") REFERENCES "assing_general_data_subject"("id_general_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades_current" ADD CONSTRAINT "grades_current_curse_following_grades_themes_id_fkey" FOREIGN KEY ("curse_following_grades_themes_id") REFERENCES "curse_following_grades_themes"("id_curse_following_grades_themes") ON DELETE CASCADE ON UPDATE CASCADE;
