import prisma from "../../prisma";
import { RequestHandler } from "express";

interface CustomError extends Error {
  status?: number;
}

const getHabitList: RequestHandler = async (req, res, next) => {
  try {
    const { studyId }: { studyId: number } = {
      studyId: Number(req.body.studyId),
    };

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
