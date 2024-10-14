-- CreateTable
CREATE TABLE "ResetPassword" (
    "id_reset_password" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expiration_date" TIMESTAMP(6) NOT NULL,
    "student_id" INTEGER,
    "teacher_id" INTEGER,

    CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id_reset_password")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_token_key" ON "ResetPassword"("token");

-- AddForeignKey
ALTER TABLE "ResetPassword" ADD CONSTRAINT "ResetPassword_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPassword" ADD CONSTRAINT "ResetPassword_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;
