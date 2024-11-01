/*
  Warnings:

  - You are about to drop the column `exam_data` on the `examn_applicant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ficha]` on the table `examn_applicant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exam_date` to the `examn_applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "examn_applicant" DROP COLUMN "exam_data",
ADD COLUMN     "exam_date" TIMESTAMP NOT NULL,
ADD COLUMN     "ficha" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "examn_applicant_ficha_key" ON "examn_applicant"("ficha");
