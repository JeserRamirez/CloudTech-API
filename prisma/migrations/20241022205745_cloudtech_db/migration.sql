/*
  Warnings:

  - Added the required column `deadline` to the `fees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fees" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
