/*
  Warnings:

  - You are about to drop the column `subject_plan_relation_id` on the `student_kardex_plan` table. All the data in the column will be lost.
  - You are about to drop the column `id_subject_plan` on the `subject_plan_relation` table. All the data in the column will be lost.
  - You are about to drop the `subject_plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_kardex_plan" DROP CONSTRAINT "student_kardex_plan_subject_plan_relation_id_fkey";

-- DropForeignKey
ALTER TABLE "subject_plan" DROP CONSTRAINT "subject_plan_id_carrer_fkey";

-- DropForeignKey
ALTER TABLE "subject_plan_relation" DROP CONSTRAINT "subject_plan_relation_id_subject_plan_fkey";

-- AlterTable
ALTER TABLE "student_kardex_plan" DROP COLUMN "subject_plan_relation_id",
ADD COLUMN     "id_study_plan" INTEGER;

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

-- CreateIndex
CREATE UNIQUE INDEX "study_plan_id_carrer_key" ON "study_plan"("id_carrer");

-- AddForeignKey
ALTER TABLE "study_plan" ADD CONSTRAINT "study_plan_id_carrer_fkey" FOREIGN KEY ("id_carrer") REFERENCES "carrer"("id_carrer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_plan_relation" ADD CONSTRAINT "subject_plan_relation_id_study_plan_fkey" FOREIGN KEY ("id_study_plan") REFERENCES "study_plan"("id_study_plan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_kardex_plan" ADD CONSTRAINT "student_kardex_plan_id_study_plan_fkey" FOREIGN KEY ("id_study_plan") REFERENCES "study_plan"("id_study_plan") ON DELETE CASCADE ON UPDATE CASCADE;
