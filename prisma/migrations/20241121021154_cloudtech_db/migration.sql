-- CreateTable
CREATE TABLE "debts_to_departments" (
    "id_debt_to_department" SERIAL NOT NULL,
    "department" TEXT,
    "description" TEXT,
    "state" TEXT,
    "student_id" INTEGER,
    "fees_id" INTEGER,

    CONSTRAINT "debts_to_departments_pkey" PRIMARY KEY ("id_debt_to_department")
);

-- AddForeignKey
ALTER TABLE "debts_to_departments" ADD CONSTRAINT "debts_to_departments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debts_to_departments" ADD CONSTRAINT "debts_to_departments_fees_id_fkey" FOREIGN KEY ("fees_id") REFERENCES "fees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
