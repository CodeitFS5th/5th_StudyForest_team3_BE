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

    const deletedHabit = await prisma.deletedHabit.findFirst({
      where: { habitId },
    });

    if (deletedHabit) {
      res.status(404).send("이미 삭제된 습관입니다!");
      return;
    }

    // 트랜잭션 실행, 오류로 인해 원본데이터만 삭제 방지
    await prisma.$transaction([
      // 습관 기록 먼저 삭제
      prisma.habitLog.deleteMany({
        where: {
          habitId: habitId,
        },
      }),

      // DeletedHabit 데이블 저장
      prisma.deletedHabit.create({
        data: {
          habitId: habit.id,
          name: habit.name,
          studyId: habit.studyId,
        },
      }),

      // 원본 습관 테이블에서 삭제
      prisma.habit.delete({
        where: { id: habitId },
      }),
    ]);
    res.status(200).send("요청하신 습관이 삭제 되었습니다!");
  } catch (error) {
    next(error);
  }
};

export default deleteHabit;
