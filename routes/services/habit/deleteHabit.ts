import prisma from "../../prisma";
import { RequestHandler } from "express";

const deleteHabit: RequestHandler = async (req, res, next) => {
  try {
    const habitId: number = Number(req.params.id);

    // 삭제할 습관 조회
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (!habit) {
      res.status(404).send("삭제할 습관이 존재하지 않습니다!");
      return;
    }

    // DeletedHabit 데이블 저장
    await prisma.deletedHabit.create({
      data: {
        habit_id: habit.id,
        name: habit.name,
        status: habit.status,
        study_id: habit.study_id,
      },
    });

    // 원본 습관 테이블에서 삭제
    await prisma.habit.delete({
      where: { id: habitId },
    });

    res.status(204).send("요청하신 습관이 삭제 되었습니다!");
  } catch (error) {
    next(error);
  }
};

export default deleteHabit;
