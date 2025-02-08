/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `DeletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - You are about to drop the column `studyId` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StudyDeleteLog` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_id` to the `StudyDeleteLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `StudyDeleteLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudyDeleteLog" DROP CONSTRAINT "StudyDeleteLog_studyId_fkey";

-- DropIndex
DROP INDEX "Study_deletedAt_idx";

-- AlterTable
ALTER TABLE "DeletedHabit" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StudyDeleteLog" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "studyId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "study_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Study_deleted_at_idx" ON "Study"("deleted_at");

-- AddForeignKey
ALTER TABLE "StudyDeleteLog" ADD CONSTRAINT "StudyDeleteLog_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
