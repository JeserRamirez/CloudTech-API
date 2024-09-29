/*
  Warnings:

  - You are about to drop the column `Area` on the `last_study_Level` table. All the data in the column will be lost.
  - You are about to drop the column `Provenence_City` on the `last_study_Level` table. All the data in the column will be lost.
  - You are about to drop the column `graduation_Score` on the `last_study_Level` table. All the data in the column will be lost.
  - You are about to drop the column `provenance_State` on the `last_study_Level` table. All the data in the column will be lost.
  - You are about to drop the column `RFC` on the `student_personal_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "last_study_Level" DROP COLUMN "Area",
DROP COLUMN "Provenence_City",
DROP COLUMN "graduation_Score",
DROP COLUMN "provenance_State",
ADD COLUMN     "area" VARCHAR,
ADD COLUMN     "graduation_score" VARCHAR,
ADD COLUMN     "provenance_state" VARCHAR,
ADD COLUMN     "provenence_city" VARCHAR;

-- AlterTable
ALTER TABLE "student_personal_data" DROP COLUMN "RFC",
ADD COLUMN     "rfc" VARCHAR;
