/*
  Warnings:

  - You are about to drop the column `class_scheduleId_class_schedule` on the `evaluation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "evaluation" DROP CONSTRAINT "evaluation_class_scheduleId_class_schedule_fkey";

-- AlterTable
ALTER TABLE "evaluation" DROP COLUMN "class_scheduleId_class_schedule";
