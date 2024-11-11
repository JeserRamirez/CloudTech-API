/*
  Warnings:

  - You are about to alter the column `group_type` on the `group` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE "group" ALTER COLUMN "group_type" SET NOT NULL,
ALTER COLUMN "group_type" SET DATA TYPE VARCHAR(1);
