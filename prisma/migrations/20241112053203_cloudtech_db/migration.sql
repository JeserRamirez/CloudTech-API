-- AlterTable
ALTER TABLE "student_current_status" ADD COLUMN     "semester" INTEGER;

-- CreateTable
CREATE TABLE "student_enrollment" (
    "enrollment_id" SERIAL NOT NULL,
    "enrollment_date" TIMESTAMP(6) NOT NULL,
    "student_id" INTEGER,

    CONSTRAINT "student_enrollment_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "student_courses" (
    "course_id" SERIAL NOT NULL,
    "class_schedule_id" INTEGER,

    CONSTRAINT "student_courses_pkey" PRIMARY KEY ("course_id")
);

-- AddForeignKey
ALTER TABLE "student_enrollment" ADD CONSTRAINT "student_enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "class_schedule"("id_class_schedule") ON DELETE CASCADE ON UPDATE CASCADE;
