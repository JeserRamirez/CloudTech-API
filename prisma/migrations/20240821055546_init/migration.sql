-- CreateTable
CREATE TABLE "Applicant" (
    "applicant_id" SERIAL NOT NULL,
    "curp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("applicant_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" SERIAL NOT NULL,
    "control_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacher_id" SERIAL NOT NULL,
    "teacher_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_curp_key" ON "Applicant"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "Student_control_number_key" ON "Student"("control_number");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_teacher_number_key" ON "Teacher"("teacher_number");
