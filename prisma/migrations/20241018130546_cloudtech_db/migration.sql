/*
  Warnings:

  - You are about to drop the column `phone` on the `student_tutor_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "scholar_data" ADD COLUMN     "admission_period" VARCHAR;

-- AlterTable
ALTER TABLE "student_personal_data" ADD COLUMN     "company" VARCHAR,
ADD COLUMN     "home_phone" VARCHAR,
ADD COLUMN     "mobile_phone" VARCHAR,
ADD COLUMN     "municipality_of_birth" VARCHAR,
ADD COLUMN     "neighborhood" VARCHAR,
ADD COLUMN     "state" VARCHAR,
ADD COLUMN     "state_of_birth" VARCHAR;

-- AlterTable
ALTER TABLE "student_tutor_data" DROP COLUMN "phone",
ADD COLUMN     "home_phone" VARCHAR,
ADD COLUMN     "mobile_phone" VARCHAR,
ADD COLUMN     "neighborhood" VARCHAR,
ADD COLUMN     "rfc" VARCHAR,
ADD COLUMN     "state" VARCHAR;
