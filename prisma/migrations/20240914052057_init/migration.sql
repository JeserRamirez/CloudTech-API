-- CreateTable
CREATE TABLE "applicant" (
    "applicant_id" SERIAL NOT NULL,
    "curp" VARCHAR(18),
    "hashed_password" VARCHAR(255),
    "is_active" BOOLEAN,
    "roles" TEXT[],
    "period" VARCHAR(255),

    CONSTRAINT "applicant_pkey" PRIMARY KEY ("applicant_id")
);

-- CreateTable
CREATE TABLE "job_data" (
    "id_teacher_number" VARCHAR NOT NULL,
    "plaza" VARCHAR,
    "degree" VARCHAR,
    "entry_date" TIMESTAMP(6),
    "department" VARCHAR,

    CONSTRAINT "job_data_pkey" PRIMARY KEY ("id_teacher_number")
);

-- CreateTable
CREATE TABLE "preventive_data" (
    "id_student" VARCHAR NOT NULL,
    "id_nss" VARCHAR,
    "clinic" VARCHAR,
    "blood_type" VARCHAR,
    "allergies" VARCHAR,
    "disability" VARCHAR,
    "psychological_problems" VARCHAR,

    CONSTRAINT "preventive_data_pkey" PRIMARY KEY ("id_student")
);

-- CreateTable
CREATE TABLE "session" (
    "id" BIGSERIAL NOT NULL,
    "user_id" VARCHAR(255),
    "token" VARCHAR(255),
    "expires_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "student_id" SERIAL NOT NULL,
    "control_number" VARCHAR(255),
    "hashed_password" VARCHAR(255),
    "is_active" BOOLEAN,
    "roles" TEXT[],
    "period" VARCHAR(255),

    CONSTRAINT "student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "student_personal_data" (
    "id_student" VARCHAR NOT NULL,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "street_name" VARCHAR,
    "street_number" VARCHAR,
    "city" VARCHAR,
    "cp" VARCHAR,
    "personal_email" VARCHAR,
    "schoolar_email" VARCHAR,

    CONSTRAINT "student_personal_data_pkey" PRIMARY KEY ("id_student")
);

-- CreateTable
CREATE TABLE "student_tutor_data" (
    "id_student" VARCHAR NOT NULL,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "street_name" VARCHAR,
    "street_number" VARCHAR,
    "city" VARCHAR,
    "cp" VARCHAR,
    "personal_email" VARCHAR,
    "phone" VARCHAR,
    "workplace" VARCHAR,

    CONSTRAINT "student_tutor_data_pkey" PRIMARY KEY ("id_student")
);

-- CreateTable
CREATE TABLE "teacher" (
    "teacher_id" SERIAL NOT NULL,
    "teacher_number" VARCHAR(255),
    "hashed_password" VARCHAR(255),
    "is_active" BOOLEAN,
    "roles" TEXT[],
    "period" VARCHAR(255),

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "teacher_personal_data" (
    "id_teacher_number" VARCHAR NOT NULL,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "street_name" VARCHAR,
    "street_number" VARCHAR,
    "city" VARCHAR,
    "cp" VARCHAR,
    "personal_email" VARCHAR,
    "schoolar_email" VARCHAR,

    CONSTRAINT "teacher_personal_data_pkey" PRIMARY KEY ("id_teacher_number")
);

-- CreateTable
CREATE TABLE "profile_picture" (
    "profile_picture_id" SERIAL NOT NULL,
    "user_id" VARCHAR(255),
    "s3_key" VARCHAR(255),
    "upload_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_picture_pkey" PRIMARY KEY ("profile_picture_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applicant_curp_key" ON "applicant"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "student_control_number_key" ON "student"("control_number");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_teacher_number_key" ON "teacher"("teacher_number");

-- CreateIndex
CREATE UNIQUE INDEX "profile_picture_user_id_key" ON "profile_picture"("user_id");

-- AddForeignKey
ALTER TABLE "job_data" ADD CONSTRAINT "job_data_id_teacher_number_fkey" FOREIGN KEY ("id_teacher_number") REFERENCES "teacher"("teacher_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preventive_data" ADD CONSTRAINT "preventive_data_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "student"("control_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_personal_data" ADD CONSTRAINT "student_personal_data_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "student"("control_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tutor_data" ADD CONSTRAINT "student_tutor_data_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "student"("control_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_personal_data" ADD CONSTRAINT "teacher_personal_data_id_teacher_number_fkey" FOREIGN KEY ("id_teacher_number") REFERENCES "teacher"("teacher_number") ON DELETE CASCADE ON UPDATE CASCADE;
