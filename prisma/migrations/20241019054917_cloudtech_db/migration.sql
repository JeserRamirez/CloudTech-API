/*
  Warnings:

  - You are about to drop the column `curp` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[curp]` on the table `applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "applicant" ADD COLUMN     "curp" VARCHAR(18);

-- AlterTable
ALTER TABLE "student" DROP COLUMN "curp";

-- CreateIndex
CREATE UNIQUE INDEX "applicant_curp_key" ON "applicant"("curp");
