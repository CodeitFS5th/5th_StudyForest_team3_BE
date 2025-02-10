/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `DeletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `habit_id` on the `DeletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `study_id` on the `DeletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `study_id` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `study_id` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - You are about to drop the column `study_id` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - Added the required column `habitId` to the `DeletedHabit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyId` to the `DeletedHabit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyId` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyId` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyId` to the `StudyDeleteLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudyDeleteLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_study_id_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_study_id_fkey";

-- DropForeignKey
ALTER TABLE "StudyDeleteLog" DROP CONSTRAINT "StudyDeleteLog_study_id_fkey";

-- DropIndex
DROP INDEX "DeletedHabit_habit_id_idx";

-- DropIndex
DROP INDEX "Study_deleted_at_idx";

-- AlterTable
ALTER TABLE "DeletedHabit" DROP COLUMN "deleted_at",
DROP COLUMN "habit_id",
DROP COLUMN "study_id",
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "habitId" INTEGER NOT NULL,
ADD COLUMN     "studyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "created_at",
DROP COLUMN "study_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "studyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "study_id",
ADD COLUMN     "studyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StudyDeleteLog" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "study_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "studyId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "DeletedHabit_habitId_idx" ON "DeletedHabit"("habitId");

-- CreateIndex
CREATE INDEX "Study_deletedAt_idx" ON "Study"("deletedAt");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyDeleteLog" ADD CONSTRAINT "StudyDeleteLog_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
