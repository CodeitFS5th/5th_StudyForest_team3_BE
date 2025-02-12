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
      include: {
        logs: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // Error: 습관이 존재하지 않으면 에러 발생
    if (habitList.length < 1) {
      res.status(404).send({ message: "습관이 존재하지 않습니다!" });
      return;
    }

    res.status(200).send(habitList); // habitList만 전달 메시지 불필요
  } catch (error) {
    next(error);
  }
};

export default getHabitList;
