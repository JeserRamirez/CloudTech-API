/*
  Warnings:

  - Added the required column `evaluation_id` to the `evaluation_section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "evaluation_question" DROP CONSTRAINT "evaluation_question_section_id_fkey";

-- AlterTable
ALTER TABLE "evaluation_section" ADD COLUMN     "evaluation_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "evaluation_section" ADD CONSTRAINT "evaluation_section_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("evaluation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_question" ADD CONSTRAINT "evaluation_question_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "evaluation_section"("section_id") ON DELETE CASCADE ON UPDATE CASCADE;
