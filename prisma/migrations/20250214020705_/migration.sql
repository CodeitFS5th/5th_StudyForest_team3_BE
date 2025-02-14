-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "emoji" JSON NOT NULL DEFAULT '{}';

-- CreateIndex
CREATE INDEX "Reaction_studyId_idx" ON "Reaction"("studyId");
