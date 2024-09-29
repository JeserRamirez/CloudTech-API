/*
  Warnings:

  - You are about to drop the `last_Study_Level` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "last_Study_Level" DROP CONSTRAINT "last_Study_Level_general_data_id_fkey";

-- DropTable
DROP TABLE "last_Study_Level";

-- CreateTable
CREATE TABLE "last_study_Level" (
    "id_last_study_Level" SERIAL NOT NULL,
    "provenance_school_name" VARCHAR,
    "provenance_State" VARCHAR,
    "Provenence_City" VARCHAR,
    "graduation_date" TIMESTAMP(3),
    "graduation_Score" VARCHAR,
    "Area" VARCHAR,
    "general_data_id" INTEGER,

    CONSTRAINT "last_study_Level_pkey" PRIMARY KEY ("id_last_study_Level")
);

-- AddForeignKey
ALTER TABLE "last_study_Level" ADD CONSTRAINT "last_study_Level_general_data_id_fkey" FOREIGN KEY ("general_data_id") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;
