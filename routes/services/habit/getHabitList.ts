import prisma from "../../prisma";
import { RequestHandler } from "express";

interface GetHabitListRequest {
  studyId: number; // uuid로 변경 시 타입 변경 필요
}

const getHabitList: RequestHandler = async (req, res, next) => {
  try {
    const studyId = Number(req.params.id);

    // Error: studyId, studyPassword 둘 중 하나라도 없으면 에러 발생
    if (!studyId) {
      res.status(400).send({ message: "스터디가 없습니다!" });
      return;
    }

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
    });

    // Error: studyID에 해당하는 스터디가 없으면 에러 발생
    if (!study) {
      res.status(404).send({ message: "스터디가 존재하지 않습니다!" });
      return;
    }

    const habitList = await prisma.habit.findMany({
      where: {
        studyId,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const habitLogList = await prisma.habitLog.findMany({
      where: {
        habitId: {
          in: habitList.map((habit) => habit.id),
        },
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (!habitList) {
      res.status(404).send([]);
      return;
    }

    const result = habitList.map((habit) => ({
      ...habit,
      isConfirm: habitLogList.some((log) => log.habitId === habit.id),
    }));

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export default getHabitList;
