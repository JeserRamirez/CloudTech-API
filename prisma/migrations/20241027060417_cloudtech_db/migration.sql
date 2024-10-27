/*
  Warnings:

  - A unique constraint covering the columns `[general_data_id]` on the table `last_study_Level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_data_id]` on the table `preventive_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_data_id]` on the table `scholar_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_data_id]` on the table `student_kardex_plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_data_id]` on the table `student_personal_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_data_id]` on the table `student_tutor_data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "last_study_Level_general_data_id_key" ON "last_study_Level"("general_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "preventive_data_general_data_id_key" ON "preventive_data"("general_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "scholar_data_general_data_id_key" ON "scholar_data"("general_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_kardex_plan_general_data_id_key" ON "student_kardex_plan"("general_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_personal_data_general_data_id_key" ON "student_personal_data"("general_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_tutor_data_general_data_id_key" ON "student_tutor_data"("general_data_id");
