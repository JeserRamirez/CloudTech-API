/*
  Warnings:

  - You are about to drop the column `student_id` on the `reset_password` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `reset_password` table. All the data in the column will be lost.
  - Added the required column `userId` to the `reset_password` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reset_password" DROP CONSTRAINT "reset_password_student_id_fkey";

-- DropForeignKey
ALTER TABLE "reset_password" DROP CONSTRAINT "reset_password_teacher_id_fkey";

-- AlterTable
ALTER TABLE "reset_password" DROP COLUMN "student_id",
DROP COLUMN "teacher_id",
ADD COLUMN     "userId" TEXT NOT NULL;
