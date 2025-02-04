"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const updateHabit = async (req, res, next) => {
    try {
        // assert 추가하세요 ^^
        const habitId = Number(req.params.id);
        const { name, status } = req.body;
        // 이름과 상태가 모두 없는 경우 방지
        // name 또는 status가 없는 경우 400 에러를 반환합니다.
        // &&이 아니라 ||로 수정해야 합니다.
        if (!name || !status) {
            res
                .status(400)
                .send({ message: "습관 생성 필수 요소가 누락되었습니다." });
            return;
        }
        // 습관 삭제여부 확인
        const deletedHabit = await prisma_1.default.deletedHabit.findFirst({
            where: {
                habit_id: habitId,
            },
        });
        if (deletedHabit) {
            res.status(403).send({ message: "이미 삭제된 습관입니다!" });
            return;
        }
        // 습관 업데이트
        const updatedHabit = await prisma_1.default.habit.update({
            where: { id: habitId },
            data: req.body,
        });
        if (!updatedHabit) {
            res.status(404).send("수정할 습관이 존재하지 않습니다!");
            return;
        }
        res.status(200).send(updatedHabit);
    }
    catch (error) {
        next(error);
    }
};
exports.default = updateHabit;
