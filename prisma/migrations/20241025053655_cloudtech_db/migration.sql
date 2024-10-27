/*
  Warnings:

  - Added the required column `start_date` to the `fees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fees" ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
