-- CreateTable
CREATE TABLE "last_Study_Level" (
    "id_last_Study_Level" SERIAL NOT NULL,
    "provenance_school_name" TEXT,
    "provenance_State" TEXT,
    "Provenence_City" TEXT,
    "graduation_date" TIMESTAMP(3),
    "graduation_Score" TEXT,
    "Area" TEXT,
    "general_data_id" INTEGER,

    CONSTRAINT "last_Study_Level_pkey" PRIMARY KEY ("id_last_Study_Level")
);

-- AddForeignKey
ALTER TABLE "last_Study_Level" ADD CONSTRAINT "last_Study_Level_general_data_id_fkey" FOREIGN KEY ("general_data_id") REFERENCES "general_data"("id_general_data") ON DELETE CASCADE ON UPDATE CASCADE;
