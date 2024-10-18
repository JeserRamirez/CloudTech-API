-- AlterTable
ALTER TABLE "student_kardex_plan" ADD COLUMN     "subject_plan_relation_id" INTEGER,
ALTER COLUMN "id_plan_relation" DROP NOT NULL,
ALTER COLUMN "complete" DROP NOT NULL,
ALTER COLUMN "end_semester" DROP NOT NULL;

-- CreateTable
CREATE TABLE "applicant_payment_token" (
    "id_payment_token" SERIAL NOT NULL,
    "applicant_id" INTEGER,
    "payment_data" JSON,
    "payment_status" BOOLEAN,

    CONSTRAINT "applicant_payment_token_pkey" PRIMARY KEY ("id_payment_token")
);

-- CreateTable
CREATE TABLE "examn_applicant" (
    "id_examn_applicant" SERIAL NOT NULL,
    "applicant_payment_token_id" INTEGER,
    "exam_data" JSON,
    "examn_status" BOOLEAN NOT NULL,

    CONSTRAINT "examn_applicant_pkey" PRIMARY KEY ("id_examn_applicant")
);

-- CreateTable
CREATE TABLE "applicant_payment_inscription" (
    "id_payment_inscription" SERIAL NOT NULL,
    "examn_applicant_id" INTEGER,
    "applicant_id" INTEGER,
    "payment_data" JSON,
    "payment_status" BOOLEAN,

    CONSTRAINT "applicant_payment_inscription_pkey" PRIMARY KEY ("id_payment_inscription")
);

-- CreateTable
CREATE TABLE "carrer" (
    "id_carrer" SERIAL NOT NULL,
    "carrer_name" VARCHAR,
    "modality" VARCHAR,

    CONSTRAINT "carrer_pkey" PRIMARY KEY ("id_carrer")
);

-- CreateTable
CREATE TABLE "subject_plan" (
    "id_subject_plan" SERIAL NOT NULL,
    "id_carrer" INTEGER,
    "name" VARCHAR,

    CONSTRAINT "subject_plan_pkey" PRIMARY KEY ("id_subject_plan")
);

-- CreateTable
CREATE TABLE "subject" (
    "id_subject" SERIAL NOT NULL,
    "subject_name" VARCHAR,
    "theoretical_hours" VARCHAR,
    "practical_hours" INTEGER,
    "credits" INTEGER,
    "syllabus" VARCHAR[],

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id_subject")
);

-- CreateTable
CREATE TABLE "specialities" (
    "id_speciality" SERIAL NOT NULL,
    "carrer_id" INTEGER,
    "speciality_name" VARCHAR,
    "duration" INTEGER,

    CONSTRAINT "specialities_pkey" PRIMARY KEY ("id_speciality")
);

-- CreateTable
CREATE TABLE "Speciality_Subject_Plan" (
    "id_speciality_subject_plan" SERIAL NOT NULL,
    "specialities_id" INTEGER,
    "subject_plan_relation_id" INTEGER,

    CONSTRAINT "Speciality_Subject_Plan_pkey" PRIMARY KEY ("id_speciality_subject_plan")
);

-- CreateTable
CREATE TABLE "subject_plan_relation" (
    "id_subject_plan_relation" SERIAL NOT NULL,
    "id_subject_plan" INTEGER,
    "id_subject" INTEGER,
    "semester" INTEGER,

    CONSTRAINT "subject_plan_relation_pkey" PRIMARY KEY ("id_subject_plan_relation")
);

-- CreateTable
CREATE TABLE "student_current_class" (
    "id_current_class" SERIAL NOT NULL,
    "class_schedule_id" INTEGER,

    CONSTRAINT "student_current_class_pkey" PRIMARY KEY ("id_current_class")
);

-- CreateTable
CREATE TABLE "group" (
    "id_group" SERIAL NOT NULL,
    "group_type" VARCHAR[],
    "semester" INTEGER,
    "period" VARCHAR(255),

    CONSTRAINT "group_pkey" PRIMARY KEY ("id_group")
);

-- CreateTable
CREATE TABLE "group_tags" (
    "id_group_tags" SERIAL NOT NULL,
    "id_group" INTEGER,
    "tag" VARCHAR,

    CONSTRAINT "group_tags_pkey" PRIMARY KEY ("id_group_tags")
);

-- CreateTable
CREATE TABLE "class_room" (
    "id_class_room" CHAR(10) NOT NULL,
    "room_number" INTEGER,
    "capacity" INTEGER,

    CONSTRAINT "class_room_pkey" PRIMARY KEY ("id_class_room")
);

-- CreateTable
CREATE TABLE "class_schedule" (
    "id_class_schedule" SERIAL NOT NULL,
    "group_id" INTEGER,
    "subject_plan_relation_id" INTEGER,
    "class_room_id" TEXT,
    "teacher_id" TEXT,
    "day_of_week" VARCHAR(255),
    "start_time" TIMESTAMP(6),
    "end_time" TIMESTAMP(6),

    CONSTRAINT "class_schedule_pkey" PRIMARY KEY ("id_class_schedule")
);

-- CreateTable
CREATE TABLE "initial_data_subject" (
    "id_initial_data_subject" SERIAL NOT NULL,
    "characterization" JSON,
    "didactics" JSON,
    "competence_specify" JSON,
    "subject_plan_relation_id" INTEGER,

    CONSTRAINT "initial_data_subject_pkey" PRIMARY KEY ("id_initial_data_subject")
);

-- CreateTable
CREATE TABLE "general_data_subject" (
    "id_general_data_subject" SERIAL NOT NULL,
    "competence_theme" JSON NOT NULL,

    CONSTRAINT "general_data_subject_pkey" PRIMARY KEY ("id_general_data_subject")
);

-- CreateTable
CREATE TABLE "general_competence_edit" (
    "id_general_competence_edit" SERIAL NOT NULL,
    "description" JSON,
    "topics_and_sub" JSON,
    "activities_learning" JSON,
    "activities_teaching" JSON,
    "competence_generic" JSON,
    "theorical" JSON,
    "practice" JSON,
    "scope_indicators" JSON,
    "value_indicator" JSON,
    "scheduling_tp" JSON,
    "scheduling_tr" JSON,
    "general_data_subject_id" INTEGER,

    CONSTRAINT "general_competence_edit_pkey" PRIMARY KEY ("id_general_competence_edit")
);

-- CreateTable
CREATE TABLE "assing_data_subject" (
    "id_assing_data_subject" SERIAL NOT NULL,
    "initial_data_subject_id" INTEGER,
    "class_schedule_id" INTEGER,

    CONSTRAINT "assing_data_subject_pkey" PRIMARY KEY ("id_assing_data_subject")
);

-- CreateTable
CREATE TABLE "assing_initial_data_subject" (
    "id_initial_data_subject" SERIAL NOT NULL,
    "characterization" JSON,
    "didactics" JSON,
    "competence_specify" JSON,
    "subject_plan_relation_id" INTEGER,

    CONSTRAINT "assing_initial_data_subject_pkey" PRIMARY KEY ("id_initial_data_subject")
);

-- CreateTable
CREATE TABLE "assing_general_data_subject" (
    "id_general_data_subject" SERIAL NOT NULL,
    "competence_theme" JSON NOT NULL,

    CONSTRAINT "assing_general_data_subject_pkey" PRIMARY KEY ("id_general_data_subject")
);

-- CreateTable
CREATE TABLE "assing_general_competence_edit" (
    "id_general_competence_edit" SERIAL NOT NULL,
    "description" JSON,
    "topics_and_sub" JSON,
    "activities_learning" JSON,
    "activities_teaching" JSON,
    "competence_generic" JSON,
    "theorical" JSON,
    "practice" JSON,
    "scope_indicators" JSON,
    "value_indicator" JSON,
    "scheduling_tp" JSON,
    "scheduling_tr" JSON,
    "general_data_subject_id" INTEGER,

    CONSTRAINT "assing_general_competence_edit_pkey" PRIMARY KEY ("id_general_competence_edit")
);

-- CreateTable
CREATE TABLE "curse_following_grades_themes" (
    "id_curse_following_grades_themes" SERIAL NOT NULL,
    "assing_data_subject_id" INTEGER,

    CONSTRAINT "curse_following_grades_themes_pkey" PRIMARY KEY ("id_curse_following_grades_themes")
);

-- CreateTable
CREATE TABLE "grades_current" (
    "id_grades_current" SERIAL NOT NULL,
    "student_current_class_id" INTEGER,
    "assing_general_data_subject_id" INTEGER,
    "grade" INTEGER,
    "faults" INTEGER,
    "percentage" VARCHAR(255),

    CONSTRAINT "grades_current_pkey" PRIMARY KEY ("id_grades_current")
);

-- CreateTable
CREATE TABLE "student_current_status" (
    "id_status" SERIAL NOT NULL,
    "student_id" INTEGER,
    "carrer_id" INTEGER,
    "general_average" VARCHAR,
    "completed_subjects" INTEGER,
    "current_subjects" INTEGER,
    "accumulated_credits" INTEGER,

    CONSTRAINT "student_current_status_pkey" PRIMARY KEY ("id_status")
);

-- CreateTable
CREATE TABLE "complementary_activity" (
    "id_complementary" SERIAL NOT NULL,
    "activity_name" VARCHAR,
    "assigned_teacher" INTEGER,
    "period" VARCHAR,
    "credits" INTEGER,

    CONSTRAINT "complementary_activity_pkey" PRIMARY KEY ("id_complementary")
);

-- CreateTable
CREATE TABLE "student_complementary_activities" (
    "id_activity" SERIAL NOT NULL,
    "student_id" INTEGER,
    "complementary_activity_id" INTEGER,
    "status" VARCHAR[],
    "period" VARCHAR,

    CONSTRAINT "student_complementary_activities_pkey" PRIMARY KEY ("id_activity")
);

-- CreateTable
CREATE TABLE "_assing_data_subjectToassing_initial_data_subject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "subject_plan_id_carrer_key" ON "subject_plan"("id_carrer");

-- CreateIndex
CREATE UNIQUE INDEX "_assing_data_subjectToassing_initial_data_subject_AB_unique" ON "_assing_data_subjectToassing_initial_data_subject"("A", "B");

-- CreateIndex
CREATE INDEX "_assing_data_subjectToassing_initial_data_subject_B_index" ON "_assing_data_subjectToassing_initial_data_subject"("B");

-- AddForeignKey
ALTER TABLE "applicant_payment_token" ADD CONSTRAINT "applicant_payment_token_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("applicant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examn_applicant" ADD CONSTRAINT "examn_applicant_applicant_payment_token_id_fkey" FOREIGN KEY ("applicant_payment_token_id") REFERENCES "applicant_payment_token"("id_payment_token") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicant_payment_inscription" ADD CONSTRAINT "applicant_payment_inscription_examn_applicant_id_fkey" FOREIGN KEY ("examn_applicant_id") REFERENCES "examn_applicant"("id_examn_applicant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicant_payment_inscription" ADD CONSTRAINT "applicant_payment_inscription_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicant"("applicant_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_plan" ADD CONSTRAINT "subject_plan_id_carrer_fkey" FOREIGN KEY ("id_carrer") REFERENCES "carrer"("id_carrer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialities" ADD CONSTRAINT "specialities_carrer_id_fkey" FOREIGN KEY ("carrer_id") REFERENCES "carrer"("id_carrer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speciality_Subject_Plan" ADD CONSTRAINT "Speciality_Subject_Plan_specialities_id_fkey" FOREIGN KEY ("specialities_id") REFERENCES "specialities"("id_speciality") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speciality_Subject_Plan" ADD CONSTRAINT "Speciality_Subject_Plan_subject_plan_relation_id_fkey" FOREIGN KEY ("subject_plan_relation_id") REFERENCES "subject_plan_relation"("id_subject_plan_relation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_plan_relation" ADD CONSTRAINT "subject_plan_relation_id_subject_plan_fkey" FOREIGN KEY ("id_subject_plan") REFERENCES "subject_plan"("id_subject_plan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_plan_relation" ADD CONSTRAINT "subject_plan_relation_id_subject_fkey" FOREIGN KEY ("id_subject") REFERENCES "subject"("id_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_kardex_plan" ADD CONSTRAINT "student_kardex_plan_subject_plan_relation_id_fkey" FOREIGN KEY ("subject_plan_relation_id") REFERENCES "subject_plan_relation"("id_subject_plan_relation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_current_class" ADD CONSTRAINT "student_current_class_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "class_schedule"("id_class_schedule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_tags" ADD CONSTRAINT "group_tags_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "group"("id_group") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id_group") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_subject_plan_relation_id_fkey" FOREIGN KEY ("subject_plan_relation_id") REFERENCES "subject_plan_relation"("id_subject_plan_relation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_class_room_id_fkey" FOREIGN KEY ("class_room_id") REFERENCES "class_room"("id_class_room") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "initial_data_subject" ADD CONSTRAINT "initial_data_subject_subject_plan_relation_id_fkey" FOREIGN KEY ("subject_plan_relation_id") REFERENCES "subject_plan_relation"("id_subject_plan_relation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_competence_edit" ADD CONSTRAINT "general_competence_edit_general_data_subject_id_fkey" FOREIGN KEY ("general_data_subject_id") REFERENCES "general_data_subject"("id_general_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_data_subject" ADD CONSTRAINT "assing_data_subject_initial_data_subject_id_fkey" FOREIGN KEY ("initial_data_subject_id") REFERENCES "initial_data_subject"("id_initial_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_data_subject" ADD CONSTRAINT "assing_data_subject_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "class_schedule"("id_class_schedule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_initial_data_subject" ADD CONSTRAINT "assing_initial_data_subject_subject_plan_relation_id_fkey" FOREIGN KEY ("subject_plan_relation_id") REFERENCES "subject_plan_relation"("id_subject_plan_relation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assing_general_competence_edit" ADD CONSTRAINT "assing_general_competence_edit_general_data_subject_id_fkey" FOREIGN KEY ("general_data_subject_id") REFERENCES "assing_general_data_subject"("id_general_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curse_following_grades_themes" ADD CONSTRAINT "curse_following_grades_themes_assing_data_subject_id_fkey" FOREIGN KEY ("assing_data_subject_id") REFERENCES "assing_data_subject"("id_assing_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades_current" ADD CONSTRAINT "grades_current_student_current_class_id_fkey" FOREIGN KEY ("student_current_class_id") REFERENCES "student_current_class"("id_current_class") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades_current" ADD CONSTRAINT "grades_current_assing_general_data_subject_id_fkey" FOREIGN KEY ("assing_general_data_subject_id") REFERENCES "assing_general_data_subject"("id_general_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_current_status" ADD CONSTRAINT "student_current_status_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_current_status" ADD CONSTRAINT "student_current_status_carrer_id_fkey" FOREIGN KEY ("carrer_id") REFERENCES "carrer"("id_carrer") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complementary_activity" ADD CONSTRAINT "complementary_activity_assigned_teacher_fkey" FOREIGN KEY ("assigned_teacher") REFERENCES "teacher"("teacher_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_complementary_activities" ADD CONSTRAINT "student_complementary_activities_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_complementary_activities" ADD CONSTRAINT "student_complementary_activities_complementary_activity_id_fkey" FOREIGN KEY ("complementary_activity_id") REFERENCES "complementary_activity"("id_complementary") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assing_data_subjectToassing_initial_data_subject" ADD CONSTRAINT "_assing_data_subjectToassing_initial_data_subject_A_fkey" FOREIGN KEY ("A") REFERENCES "assing_data_subject"("id_assing_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assing_data_subjectToassing_initial_data_subject" ADD CONSTRAINT "_assing_data_subjectToassing_initial_data_subject_B_fkey" FOREIGN KEY ("B") REFERENCES "assing_initial_data_subject"("id_initial_data_subject") ON DELETE CASCADE ON UPDATE CASCADE;
