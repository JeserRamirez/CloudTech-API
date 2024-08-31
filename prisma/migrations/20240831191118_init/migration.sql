-- CreateTable
CREATE TABLE "Applicant" (
    "applicant_id" SERIAL NOT NULL,
    "curp" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("applicant_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" SERIAL NOT NULL,
    "control_number" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacher_id" SERIAL NOT NULL,
    "teacher_number" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalData" (
    "personal_data_id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("personal_data_id")
);

-- CreateTable
CREATE TABLE "ProfilePicture" (
    "profile_picture_id" SERIAL NOT NULL,
    "s3_key" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personal_data_id" INTEGER NOT NULL,

    CONSTRAINT "ProfilePicture_pkey" PRIMARY KEY ("profile_picture_id")
);

-- CreateTable
CREATE TABLE "ApplicantDocuments" (
    "applicant_document_id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "s3_key" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicant_id" INTEGER,

    CONSTRAINT "ApplicantDocuments_pkey" PRIMARY KEY ("applicant_document_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_curp_key" ON "Applicant"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "Student_control_number_key" ON "Student"("control_number");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_teacher_number_key" ON "Teacher"("teacher_number");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_userId_key" ON "PersonalData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_email_key" ON "PersonalData"("email");

-- CreateIndex
CREATE INDEX "PersonalData_first_name_last_name_idx" ON "PersonalData"("first_name", "last_name");

-- CreateIndex
CREATE UNIQUE INDEX "ProfilePicture_personal_data_id_key" ON "ProfilePicture"("personal_data_id");

-- AddForeignKey
ALTER TABLE "ProfilePicture" ADD CONSTRAINT "ProfilePicture_personal_data_id_fkey" FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData"("personal_data_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantDocuments" ADD CONSTRAINT "ApplicantDocuments_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("applicant_id") ON DELETE SET NULL ON UPDATE CASCADE;
