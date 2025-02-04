"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const getHabitList = async (req, res, next) => {
    try {
        const { studyId } = req.body;
        const habitList = await prisma_1.default.habit.findMany({
            where: {
                study_id: studyId,
            },
        });
        if (habitList.length === 0) {
            const error = new Error("습관이 존재하지 않습니다!");
            error.status = 404;
            throw error;
        }
        res.status(200).send({ habitList });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getHabitList;
