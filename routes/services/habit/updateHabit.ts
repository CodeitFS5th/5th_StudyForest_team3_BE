import prisma from "../../prisma";
import { RequestHandler } from "express";

const updateHabit: RequestHandler = async (req, res, next) => {
  try {
    const habitId: number = Number(req.params.id);
    const { name, status } = req.body;

    // 이름과 상태가 모두 없는 경우 방지
    if (name === undefined && status === undefined) {
      res.status(400).send("업데이트할 데이터가 없습니다.");
      return;
    }

    // 상태 값 검증
    if (status !== undefined && !["DONE", "UNDONE"].includes(status)) {
      res.status(400).send("유효하지 않은 상태값입니다.");
      return;
    }

    const upData: { name?: String; status?: "DONE" | "UNDONE" } = {};
    if (name !== undefined) upData.name = name;
    if (status !== undefined) upData.status = status;

    // 습관 삭제여부 확인
    const deletedHabit = await prisma.deletedHabit.findFirst({
      where: {
        habit_id: habitId,
      },
    });

    if (deletedHabit) {
      res.status(403).send("이미 삭제된 습관입니다!");
      return;
    }

    // 습관 업데이트
    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: upData,
    });

    if (!updatedHabit) {
      res.status(404).send("수정할 습관이 존재하지 않습니다!");
      return;
    }

    res.status(200).send(updatedHabit);
  } catch (error) {
    next(error);
  }
};

export default updateHabit;
