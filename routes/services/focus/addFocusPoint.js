"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const addFocusPoint = async (req, res, next) => {
    try {
        const { studyId, duration } = req.body;
        if (!studyId || !duration) {
            res.status(400).json({ message: "studyId와 duration이 필요합니다." });
            return;
        }
        const pointsToAdd = 3 + Math.floor(duration / 10);
        const updatedStudy = await prisma_1.default.study.update({
            where: { id: studyId },
            data: { point: { increment: pointsToAdd } },
        });
        res.status(200).json({
            message: "집중 완료, 포인트가 추가되었습니다.",
            addedPoints: pointsToAdd,
            totalPoints: updatedStudy.point,
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.default = addFocusPoint;
