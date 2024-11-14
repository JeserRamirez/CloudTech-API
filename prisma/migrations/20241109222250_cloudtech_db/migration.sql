/*
  Warnings:

  - You are about to drop the column `section_id` on the `evaluation_feedback` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "evaluation_feedback" DROP CONSTRAINT "evaluation_feedback_section_id_fkey";

-- AlterTable
ALTER TABLE "evaluation_feedback" DROP COLUMN "section_id";
