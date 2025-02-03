import prisma from "../../prisma";
import { RequestHandler } from "express";

interface CustomError extends Error {
  status?: number;
}

interface GetHabitListRequest {
  studyId: number; // uuid로 변경 시 타입 변경 필요
  studyPassword: string;
}

const getHabitList: RequestHandler = async (req, res, next) => {
  try {
    const { studyId, studyPassword } = req.body as GetHabitListRequest;

    // Error: studyId, studyPassword 둘 중 하나라도 없으면 에러 발생
    if (!studyId || !studyPassword) {
      const error: CustomError = new Error(
        "studyId 또는 studyPassword가 없습니다!"
      );
      error.status = 400;
      throw error;
    }

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
    });

    // Error: studyID에 해당하는 스터디가 없으면 에러 발생
    if (!study) {
      const error: CustomError = new Error("스터디가 존재하지 않습니다!");
      error.status = 404;
      throw error;
    }

    // Error: studyPassword가 일치하지 않으면 에러 발생
    if (study.password !== studyPassword) {
      const error: CustomError = new Error(
        "스터디 비밀번호가 일치하지 않습니다!"
      );
      error.status = 401;
      throw error;
    }

    const habitList = await prisma.habit.findMany({
      where: {
        study_id: studyId,
      },
    });

    // Error: 습관이 존재하지 않으면 에러 발생
    if (habitList.length === 0) {
      const error: CustomError = new Error("습관이 존재하지 않습니다!");
      error.status = 404;
      throw error;
    }

    res
      .status(200)
      .send({ message: "습관 목록 조회 결과입니다!", data: habitList });
  } catch (error) {
    next(error);
  }
};

export default getHabitList;
