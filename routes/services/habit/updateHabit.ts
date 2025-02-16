import prisma from "../../prisma";
import { RequestHandler } from "express";

const updateHabit: RequestHandler = async (req, res, next) => {
  try {
    // assert 추가하세요 ^^

    const habitId: number = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      res
        .status(400)
        .send({ message: "습관 이름이 누락되었습니다." });
      return;
    }

    // 습관 삭제여부 확인
    const deletedHabit = await prisma.deletedHabit.findFirst({
      where: {
        habitId,
      },
    });

    if (deletedHabit) {
      res.status(403).send({ message: "이미 삭제된 습관입니다!" });
      return;
    }

    // 습관 업데이트
    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: req.body,
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
