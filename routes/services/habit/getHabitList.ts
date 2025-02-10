import prisma from "../../prisma";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

interface GetHabitListRequest {
  studyId: number; // uuid로 변경 시 타입 변경 필요
  studyPassword: string;
}

const getHabitList: RequestHandler = async (req, res, next) => {
  try {
    const { studyId, studyPassword } = req.body as GetHabitListRequest;

    // Error: studyId, studyPassword 둘 중 하나라도 없으면 에러 발생
    if (!studyId || !studyPassword) {
      res
        .status(400)
        .send({ message: "studyId 또는 studyPassword가 없습니다!" });
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

    // Error: studyPassword가 일치하지 않으면 에러 발생
    const isPasswordValid = await bcrypt.compare(studyPassword, study.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: "스터디 비밀번호가 일치하지 않습니다!" });
      return;
    }

    const habitList = await prisma.habit.findMany({
      where: {
        studyId: studyId,
      },
    });

    // Error: 습관이 존재하지 않으면 에러 발생
    if (habitList.length === 0) {
      res.status(404).send({ message: "습관이 존재하지 않습니다!" });
      return;
    }

    res
      .status(200)
      .send({ message: "습관 목록 조회 결과입니다!", data: habitList });
  } catch (error) {
    next(error);
  }
};

export default getHabitList;
