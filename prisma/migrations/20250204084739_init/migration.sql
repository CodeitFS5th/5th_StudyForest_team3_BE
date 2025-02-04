-- CreateEnum
CREATE TYPE "HabitStatus" AS ENUM ('DONE', 'UNDONE');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('GREEN', 'YELLOW', 'BLUE', 'RED', 'PHOTO_1', 'PHOTO_2', 'PHOTO_3');

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "HabitStatus" NOT NULL DEFAULT 'UNDONE',
    "study_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeletedHabit" (
    "id" SERIAL NOT NULL,
    "habit_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "HabitStatus" NOT NULL DEFAULT 'UNDONE',
    "study_id" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeletedHabit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "emoji" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "study_id" INTEGER NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "nick" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "background" "ImageType" NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyDeleteLog" (
    "id" SERIAL NOT NULL,
    "studyId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyDeleteLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeletedHabit_habit_id_idx" ON "DeletedHabit"("habit_id");

-- CreateIndex
CREATE INDEX "Study_deletedAt_idx" ON "Study"("deletedAt");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDeleteLog" ADD CONSTRAINT "StudyDeleteLog_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
