import prisma from "../../prisma";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

interface CustomError extends Error {
  status?: number;
}
interface DeleteStudyRequest {
  studyPassword: string;
  reason?: string;
}

const deleteStudy: RequestHandler = async (req, res, next) => {
  try {
    const studyId: number = Number(req.params.id); // uuid로 변경 시 타입 변경 필요
    const { studyPassword, reason } = req.body as DeleteStudyRequest;

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
        deletedAt: {
          is: null, // null과 undefined 모두 체크
        },
      },
    });

    // Error: 삭제할 스터디가 존재하지 않으면 에러 발생
    if (!study) {
      const error: CustomError = new Error(
        "삭제할 스터디가 존재하지 않습니다!"
      );
      error.status = 404;
      throw error;
    }

    // Error: studyPassword를 req.body에서 받지 않으면 에러 발생
    if (!studyPassword) {
      const error: CustomError = new Error("스터디 비밀번호가 없습니다!");
      error.status = 400;
      throw error;
    }

    // Error: studyPassword가 일치하지 않으면 에러 발생
    const isPasswordValid = await bcrypt.compare(studyPassword, study.password);

    if (!isPasswordValid) {
      const error: CustomError = new Error(
        "스터디 비밀번호가 일치하지 않습니다!"
      );
      error.status = 401;
      throw error;
    }

    const now = new Date();

    const [updatedStudy, createdDeleteLog] = await prisma.$transaction([
      prisma.study.update({
        where: {
          id: studyId,
        },
        data: {
          deletedAt: now,
        },
        select: {
          id: true,
          nick: true,
          name: true,
          description: true,
          deletedAt: true,
        },
      }),
      prisma.studyDeleteLog.create({
        data: {
          studyId,
          deletedAt: now,
          ...(reason && { reason }),
        },
      }),
    ]);

    res.status(200).send({
      message: "스터디가 삭제되었습니다!",
      data: { ...updatedStudy, ...(reason && { reason }) },
    });
  } catch (error) {
    next(error);
  }
};

export default deleteStudy;
