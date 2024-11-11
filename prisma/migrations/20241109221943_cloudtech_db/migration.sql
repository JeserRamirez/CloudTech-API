/*
  Warnings:

  - Added the required column `section_id` to the `evaluation_feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evaluation_feedback" ADD COLUMN     "section_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "evaluation_feedback" ADD CONSTRAINT "evaluation_feedback_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "evaluation_section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;
