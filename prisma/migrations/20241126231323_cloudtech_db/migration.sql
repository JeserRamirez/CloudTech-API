-- DropForeignKey
ALTER TABLE "student_current_status" DROP CONSTRAINT "student_current_status_carrer_id_fkey";

-- DropForeignKey
ALTER TABLE "student_current_status" DROP CONSTRAINT "student_current_status_student_id_fkey";

-- AddForeignKey
ALTER TABLE "student_current_status" ADD CONSTRAINT "student_current_status_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_current_status" ADD CONSTRAINT "student_current_status_carrer_id_fkey" FOREIGN KEY ("carrer_id") REFERENCES "carrer"("id_carrer") ON DELETE CASCADE ON UPDATE CASCADE;
