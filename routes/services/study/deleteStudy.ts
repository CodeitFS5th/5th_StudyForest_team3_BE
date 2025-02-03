import prisma from "../../prisma";
import { RequestHandler } from "express";

interface CustomError extends Error {
  status?: number;
}

const deleteStudy: RequestHandler = async (req, res, next) => {
  try {
    const studyId: number = Number(req.params.id);

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
    });

    if (!study) {
      // 미들웨어 사용을 위해 error 객체를 throw
      const error: CustomError = new Error(
        "삭제할 스터디가 존재하지 않습니다!"
      ); // error 클래스를 정의해두는 것도 좋을 듯!
      error.status = 404;
      throw error;
    }

    const now = new Date();

    await prisma.$transaction([
      await prisma.study.update({
        where: {
          id: studyId,
        },
        data: {
          deletedAt: now,
        },
      }),
      await prisma.studyDeleteLog.create({
        data: {
          studyId,
          deletedAt: now,
        },
      }),
    ]);

    res.status(200).send("스터디가 삭제되었습니다!");
  } catch (error) {
    next(error);
  }
};

export default deleteStudy;
