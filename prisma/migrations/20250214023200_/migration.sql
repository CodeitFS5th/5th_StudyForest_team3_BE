/*
  Warnings:

  - You are about to drop the column `emoji` on the `Study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "emoji",
ADD COLUMN     "reactions" JSON NOT NULL DEFAULT '{}';
