/*
  Warnings:

  - You are about to drop the column `evaluation_id` on the `evaluation_section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "evaluation_section" DROP CONSTRAINT "evaluation_section_evaluation_id_fkey";

-- AlterTable
ALTER TABLE "evaluation_section" DROP COLUMN "evaluation_id";
