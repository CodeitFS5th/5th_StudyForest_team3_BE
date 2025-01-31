import prisma from "../../prisma";
import { RequestHandler } from "express";

const updateHabit: RequestHandler = async (req, res, next) => {
  try {
    const habitId: number = Number(req.params.id);
    const upData = req.body;

    // 습관 삭제여부 확인
    const deletedHabit = await prisma.deletedHabit.findUnique({
      where: {
        id: habitId,
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
