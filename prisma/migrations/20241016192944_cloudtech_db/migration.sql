/*
  Warnings:

  - You are about to drop the `Speciality_Subject_Plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Speciality_Subject_Plan" DROP CONSTRAINT "Speciality_Subject_Plan_specialities_id_fkey";

-- DropForeignKey
ALTER TABLE "Speciality_Subject_Plan" DROP CONSTRAINT "Speciality_Subject_Plan_subject_plan_relation_id_fkey";

-- DropTable
DROP TABLE "Speciality_Subject_Plan";

-- CreateTable
CREATE TABLE "speciality_subject_plan" (
    "id_speciality_subject_plan" SERIAL NOT NULL,
    "specialities_id" INTEGER,
    "subject_plan_relation_id" INTEGER,

    CONSTRAINT "speciality_subject_plan_pkey" PRIMARY KEY ("id_speciality_subject_plan")
);

-- AddForeignKey
ALTER TABLE "speciality_subject_plan" ADD CONSTRAINT "speciality_subject_plan_specialities_id_fkey" FOREIGN KEY ("specialities_id") REFERENCES "specialities"("id_speciality") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speciality_subject_plan" ADD CONSTRAINT "speciality_subject_plan_subject_plan_relation_id_fkey" FOREIGN KEY ("subject_plan_relation_id") REFERENCES "subject_plan_relation"("id_subject_plan_relation") ON DELETE CASCADE ON UPDATE CASCADE;
