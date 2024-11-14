/*
  Warnings:

  - You are about to drop the column `payment_data` on the `applicant_payment_inscription` table. All the data in the column will be lost.
  - The primary key for the `class_room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_class_room` column on the `class_room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `class_room_id` column on the `class_schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teacher_id` column on the `class_schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `group_type` on the `group` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(1)`.
  - You are about to drop the column `period` on the `student_complementary_activities` table. All the data in the column will be lost.
  - You are about to drop the column `subject_plan_relation_id` on the `student_kardex_plan` table. All the data in the column will be lost.
  - You are about to drop the column `id_subject_plan` on the `subject_plan_relation` table. All the data in the column will be lost.
  - You are about to drop the `subject_plan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payment_method` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference_number` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `applicant_payment_inscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "class_schedule" DROP CONSTRAINT "class_schedule_class_room_id_fkey";

-- DropForeignKey
ALTER TABLE "class_schedule" DROP CONSTRAINT "class_schedule_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "student_kardex_plan" DROP CONSTRAINT "student_kardex_plan_subject_plan_relation_id_fkey";

-- DropForeignKey
ALTER TABLE "subject_plan" DROP CONSTRAINT "subject_plan_id_carrer_fkey";

-- DropForeignKey
ALTER TABLE "subject_plan_relation" DROP CONSTRAINT "subject_plan_relation_id_subject_plan_fkey";

-- AlterTable
ALTER TABLE "applicant_payment_inscription" DROP COLUMN "payment_data",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "inscription_request_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payment_method" VARCHAR(255) NOT NULL,
ADD COLUMN     "reference_number" VARCHAR(255) NOT NULL,
ADD COLUMN     "state" VARCHAR(255) NOT NULL,
ADD COLUMN     "total_amount_to_pay" DECIMAL(10,2),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "class_room" DROP CONSTRAINT "class_room_pkey",
DROP COLUMN "id_class_room",
ADD COLUMN     "id_class_room" SERIAL NOT NULL,
ALTER COLUMN "room_number" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "class_room_pkey" PRIMARY KEY ("id_class_room");

-- AlterTable
ALTER TABLE "class_schedule" DROP COLUMN "class_room_id",
ADD COLUMN     "class_room_id" INTEGER,
DROP COLUMN "teacher_id",
ADD COLUMN     "teacher_id" INTEGER;

-- AlterTable
ALTER TABLE "group" ALTER COLUMN "group_type" SET NOT NULL,
ALTER COLUMN "group_type" SET DATA TYPE VARCHAR(1);

-- AlterTable
ALTER TABLE "student_complementary_activities" DROP COLUMN "period",
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "student_kardex_plan" DROP COLUMN "subject_plan_relation_id",
ADD COLUMN     "id_study_plan" INTEGER;

-- AlterTable
ALTER TABLE "subject" ALTER COLUMN "syllabus" SET NOT NULL,
ALTER COLUMN "syllabus" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "subject_plan_relation" DROP COLUMN "id_subject_plan",
ADD COLUMN     "id_study_plan" INTEGER;

-- DropTable
DROP TABLE "subject_plan";

-- CreateTable
CREATE TABLE "study_plan" (
    "id_study_plan" SERIAL NOT NULL,
    "id_carrer" INTEGER,
    "name" VARCHAR,

    CONSTRAINT "study_plan_pkey" PRIMARY KEY ("id_study_plan")
);

-- CreateTable
CREATE TABLE "evaluation_section" (
    "section_id" SERIAL NOT NULL,
    "section_name" TEXT NOT NULL,

    CONSTRAINT "evaluation_section_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "evaluation_question" (
    "question_id" SERIAL NOT NULL,
    "question_text" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "evaluation_question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "evaluation" (
    "evaluation_id" SERIAL NOT NULL,
    "evaluation_date_id" INTEGER,

    CONSTRAINT "evaluation_pkey" PRIMARY KEY ("evaluation_id")
);

-- CreateTable
CREATE TABLE "evaluation_date" (
    "evaluation_date_id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "period_id" INTEGER NOT NULL,

    CONSTRAINT "evaluation_date_pkey" PRIMARY KEY ("evaluation_date_id")
);

-- CreateTable
CREATE TABLE "evaluation_response" (
    "response_id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "evaluation_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "evaluation_response_pkey" PRIMARY KEY ("response_id")
);

-- CreateTable
CREATE TABLE "evaluation_feedback" (
    "feedback_id" SERIAL NOT NULL,
    "feedback_text" TEXT NOT NULL,
    "evaluation_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evaluation_feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "study_plan_id_carrer_key" ON "study_plan"("id_carrer");

-- AddForeignKey
ALTER TABLE "study_plan" ADD CONSTRAINT "study_plan_id_carrer_fkey" FOREIGN KEY ("id_carrer") REFERENCES "carrer"("id_carrer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_plan_relation" ADD CONSTRAINT "subject_plan_relation_id_study_plan_fkey" FOREIGN KEY ("id_study_plan") REFERENCES "study_plan"("id_study_plan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_kardex_plan" ADD CONSTRAINT "student_kardex_plan_id_study_plan_fkey" FOREIGN KEY ("id_study_plan") REFERENCES "study_plan"("id_study_plan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_class_room_id_fkey" FOREIGN KEY ("class_room_id") REFERENCES "class_room"("id_class_room") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_question" ADD CONSTRAINT "evaluation_question_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "evaluation_section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_evaluation_date_id_fkey" FOREIGN KEY ("evaluation_date_id") REFERENCES "evaluation_date"("evaluation_date_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_date" ADD CONSTRAINT "evaluation_date_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("evaluation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "evaluation_question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_feedback" ADD CONSTRAINT "evaluation_feedback_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("evaluation_id") ON DELETE CASCADE ON UPDATE CASCADE;
