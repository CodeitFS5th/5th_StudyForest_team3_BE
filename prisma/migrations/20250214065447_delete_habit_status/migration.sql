/*
  Warnings:

  - You are about to drop the column `status` on the `DeletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeletedHabit" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Study" ALTER COLUMN "reactions" DROP NOT NULL,
ALTER COLUMN "reactions" DROP DEFAULT,
ALTER COLUMN "reactions" SET DATA TYPE JSONB;

-- DropEnum
DROP TYPE "HabitStatus";
