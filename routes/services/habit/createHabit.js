"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const createHabit = async (req, res, next) => {
    try {
        const { studyId, name } = req.body;
        if (!studyId || !name) {
            res.status(400).json({ message: "studyId와 name이 필요합니다." });
            return;
        }
        const newHabit = await prisma_1.default.habit.create({
            data: {
                study_id: studyId,
                name,
                status: "UNDONE", // 기본값 설정
            },
        });
        res.status(201).json({
            message: "새로운 습관이 생성되었습니다.",
            habit: newHabit,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = createHabit;
