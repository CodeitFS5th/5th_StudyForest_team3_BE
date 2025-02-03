import prisma from "../../prisma";
import { RequestHandler } from "express";

interface CustomError extends Error {
  status?: number;
}

interface GetHabitListRequest {
  studyId: number; // uuid로 변경 시 타입 변경 필요
}

const getHabitList: RequestHandler = async (req, res, next) => {
  try {
    const { studyId } = req.body as GetHabitListRequest;

    const habitList = await prisma.habit.findMany({
      where: {
        study_id: studyId,
      },
    });

    if (habitList.length === 0) {
      const error: CustomError = new Error("습관이 존재하지 않습니다!");
      error.status = 404;
      throw error;
    }

    res.status(200).send({ habitList });
  } catch (error) {
    next(error);
  }
};

export default getHabitList;
