-- CreateTable
CREATE TABLE "student_payment_reinscription" (
    "id_student_reinscription" SERIAL NOT NULL,
    "reinscription_token" VARCHAR(255),
    "reinscription_request_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "validation_date" TIMESTAMP(6),
    "authorization" VARCHAR(255),
    "payment_status" BOOLEAN,
    "student_id" INTEGER,
    "fees_id" INTEGER,

    CONSTRAINT "student_payment_reinscription_pkey" PRIMARY KEY ("id_student_reinscription")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_payment_reinscription_reinscription_token_key" ON "student_payment_reinscription"("reinscription_token");

-- AddForeignKey
ALTER TABLE "student_payment_reinscription" ADD CONSTRAINT "student_payment_reinscription_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_payment_reinscription" ADD CONSTRAINT "student_payment_reinscription_fees_id_fkey" FOREIGN KEY ("fees_id") REFERENCES "fees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
