import prisma from "../../prisma";
import { RequestHandler } from "express";

const toggleHabitLog: RequestHandler = async (req, res, next) => {
  try {
    const habitId = Number(req.params.id);

    // 습관 조회
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (!habit) {
      res.status(404).send("습관이 존재하지 않습니다!");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 습관 로그 조회
    const habitLog = await prisma.habitLog.findFirst({
      where: {
        habitId: habitId,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    let result;

    // 로그가 있는 경우
    if (habitLog) {
      result = await prisma.habitLog.delete({
        where: {
          id: habitLog.id,
        },
      });
    } else {
      result = await prisma.habitLog.create({
        data: {
          habitId: habitId,
        },
      });
    }

    res.json({
      message: habitLog ? "습관 기록 삭제" : "습관 기록 생성",
      habitLog: result,
    });
  } catch (error) {
    next(error);
  }
};

export default toggleHabitLog;
