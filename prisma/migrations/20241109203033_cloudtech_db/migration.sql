-- CreateTable
CREATE TABLE "evaluation_question" (
    "question_id" SERIAL NOT NULL,
    "question_text" TEXT NOT NULL,

    CONSTRAINT "evaluation_question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "evaluation" (
    "evaluation_id" SERIAL NOT NULL,
    "evaluation_date_id" INTEGER,
    "class_schedule_id" INTEGER,

    CONSTRAINT "evaluation_pkey" PRIMARY KEY ("evaluation_id")
);

-- CreateTable
CREATE TABLE "evaluation_date" (
    "evaluation_date_id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "period_id" INTEGER NOT NULL,

    CONSTRAINT "evaluation_date_pkey" PRIMARY KEY ("evaluation_date_id")
);

-- CreateTable
CREATE TABLE "evaluation_response" (
    "response_id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "evaluation_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "evaluation_response_pkey" PRIMARY KEY ("response_id")
);

-- CreateTable
CREATE TABLE "evaluation_feedback" (
    "feedback_id" SERIAL NOT NULL,
    "feedback_text" TEXT NOT NULL,
    "evaluation_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evaluation_feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- AddForeignKey
ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_evaluation_date_id_fkey" FOREIGN KEY ("evaluation_date_id") REFERENCES "evaluation_date"("evaluation_date_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "class_schedule"("id_class_schedule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_date" ADD CONSTRAINT "evaluation_date_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("evaluation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "evaluation_question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_feedback" ADD CONSTRAINT "evaluation_feedback_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("evaluation_id") ON DELETE CASCADE ON UPDATE CASCADE;
