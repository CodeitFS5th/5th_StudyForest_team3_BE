"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const deleteHabit = async (req, res, next) => {
    try {
        const habitId = Number(req.params.id);
        // 삭제할 습관 조회
        const habit = await prisma_1.default.habit.findUnique({
            where: {
                id: habitId,
            },
        });
        if (!habit) {
            res.status(404).send("삭제할 습관이 존재하지 않습니다!");
            return;
        }
        const deletedHabit = await prisma_1.default.deletedHabit.findFirst({
            where: { habit_id: habitId },
        });
        if (deletedHabit) {
            res.status(404).send("이미 삭제된 습관입니다!");
            return;
        }
        // 트랜잭션 실행, 오류로 인해 원본데이터만 삭제 방지
        await prisma_1.default.$transaction([
            // DeletedHabit 데이블 저장
            prisma_1.default.deletedHabit.create({
                data: {
                    habit_id: habit.id,
                    name: habit.name,
                    status: habit.status,
                    study_id: habit.study_id,
                },
            }),
            // 원본 습관 테이블에서 삭제
            prisma_1.default.habit.delete({
                where: { id: habitId },
            }),
        ]);
        res.status(200).send("요청하신 습관이 삭제 되었습니다!");
    }
    catch (error) {
        next(error);
    }
};
exports.default = deleteHabit;
