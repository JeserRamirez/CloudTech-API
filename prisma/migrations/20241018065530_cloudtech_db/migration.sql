/*
  Warnings:

  - You are about to drop the column `assing_general_competence_edit_id` on the `assing_initial_data_subject` table. All the data in the column will be lost.
  - You are about to drop the column `general_competence_edit_id` on the `initial_data_subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "assing_initial_data_subject" DROP CONSTRAINT "assing_initial_data_subject_assing_general_competence_edit_fkey";

-- DropForeignKey
ALTER TABLE "initial_data_subject" DROP CONSTRAINT "initial_data_subject_general_competence_edit_id_fkey";

-- AlterTable
ALTER TABLE "assing_initial_data_subject" DROP COLUMN "assing_general_competence_edit_id";

-- AlterTable
ALTER TABLE "initial_data_subject" DROP COLUMN "general_competence_edit_id";
