-- AlterTable
ALTER TABLE "last_Study_Level" ALTER COLUMN "provenance_school_name" SET DATA TYPE VARCHAR,
ALTER COLUMN "provenance_State" SET DATA TYPE VARCHAR,
ALTER COLUMN "Provenence_City" SET DATA TYPE VARCHAR,
ALTER COLUMN "graduation_Score" SET DATA TYPE VARCHAR,
ALTER COLUMN "Area" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "scholar_data" ALTER COLUMN "school_prev" SET DATA TYPE VARCHAR,
ALTER COLUMN "graduation_period" SET DATA TYPE VARCHAR,
ALTER COLUMN "current_period" SET DATA TYPE VARCHAR,
ALTER COLUMN "status" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "student_personal_data" ADD COLUMN     "RFC" VARCHAR,
ADD COLUMN     "birthdate" VARCHAR,
ADD COLUMN     "civil_status" VARCHAR,
ADD COLUMN     "curp" VARCHAR,
ADD COLUMN     "laboral_status" VARCHAR,
ADD COLUMN     "phone" VARCHAR;
