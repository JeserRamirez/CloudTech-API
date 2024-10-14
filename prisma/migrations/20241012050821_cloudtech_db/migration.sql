/*
  Warnings:

  - You are about to drop the `ResetPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_student_id_fkey";

-- DropForeignKey
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_teacher_id_fkey";

-- DropTable
DROP TABLE "ResetPassword";

-- CreateTable
CREATE TABLE "reset_password" (
    "id_reset_password" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expiration_date" TIMESTAMP(6) NOT NULL,
    "student_id" INTEGER,
    "teacher_id" INTEGER,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id_reset_password")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_token_key" ON "reset_password"("token");

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "reset_password_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "reset_password_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;
