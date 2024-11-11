/*
  Warnings:

  - The primary key for the `class_room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_class_room` column on the `class_room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `class_room_id` column on the `class_schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "class_schedule" DROP CONSTRAINT "class_schedule_class_room_id_fkey";

-- AlterTable
ALTER TABLE "class_room" DROP CONSTRAINT "class_room_pkey",
DROP COLUMN "id_class_room",
ADD COLUMN     "id_class_room" SERIAL NOT NULL,
ADD CONSTRAINT "class_room_pkey" PRIMARY KEY ("id_class_room");

-- AlterTable
ALTER TABLE "class_schedule" DROP COLUMN "class_room_id",
ADD COLUMN     "class_room_id" INTEGER;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_class_room_id_fkey" FOREIGN KEY ("class_room_id") REFERENCES "class_room"("id_class_room") ON DELETE CASCADE ON UPDATE CASCADE;
