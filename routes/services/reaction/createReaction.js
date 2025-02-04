"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createReaction = async (req, res, next) => {
    try {
        const { studyId, emoji } = req.body;
        if (!studyId || !emoji) {
            res.status(400).json({ message: "studyId와 emoji가 필요합니다." });
            return;
        }
        // 같은 study_id + emoji 조합이 있는지 확인
        const existingReaction = await prisma.reaction.findFirst({
            where: { study_id: studyId, emoji },
        });
        let updatedReaction;
        if (existingReaction) {
            // 기존 반응이 있으면 count 증가 dd
            updatedReaction = await prisma.reaction.update({
                where: { id: existingReaction.id },
                data: { count: { increment: 1 } },
            });
        }
        else {
            // 새로운 반응 추가
            updatedReaction = await prisma.reaction.create({
                data: {
                    study_id: studyId,
                    emoji,
                    count: 1,
                },
            });
        }
        res.status(201).json({
            message: "응원 이모지가 추가되었습니다.",
            reaction: updatedReaction,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createReaction = createReaction;
