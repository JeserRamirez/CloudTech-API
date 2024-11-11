/*
  Warnings:

  - Added the required column `section_id` to the `evaluation_question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evaluation_question" ADD COLUMN     "section_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "evaluation_section" (
    "section_id" SERIAL NOT NULL,
    "section_name" TEXT NOT NULL,

    CONSTRAINT "evaluation_section_pkey" PRIMARY KEY ("section_id")
);

-- AddForeignKey
ALTER TABLE "evaluation_question" ADD CONSTRAINT "evaluation_question_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "evaluation_section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;
