/*
  Warnings:

  - Made the column `deadline` on table `fees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `fees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "fees" ALTER COLUMN "deadline" SET NOT NULL,
ALTER COLUMN "start_date" SET NOT NULL;
