/*
  Warnings:

  - You are about to drop the column `password` on the `Applicant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `hashed_password` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "password",
ADD COLUMN     "hashed_password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "password",
ADD COLUMN     "hashed_password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "password",
ADD COLUMN     "hashed_password" TEXT NOT NULL;
