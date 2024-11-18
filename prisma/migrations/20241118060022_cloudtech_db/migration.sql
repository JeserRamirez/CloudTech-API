-- AlterTable
ALTER TABLE "evaluation_response" ADD COLUMN     "student_current_class_id" INTEGER;

-- AddForeignKey
ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_student_current_class_id_fkey" FOREIGN KEY ("student_current_class_id") REFERENCES "student_current_class"("id_current_class") ON DELETE CASCADE ON UPDATE CASCADE;
