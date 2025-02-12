import prisma from "../../prisma";
import { RequestHandler } from "express";

const deleteStudy: RequestHandler = async (req, res, next) => {
  try {
    const studyId: number = Number(req.params.id);

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
        deletedAt: {
          equals: null,
        },
      },
    });

    // Error: 삭제할 스터디가 존재하지 않으면 에러 발생
    if (!study) {
      res.status(404).send({ message: "삭제할 스터디가 존재하지 않습니다!" });
      return;
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
          studyId: studyId,
          deletedAt: now,
        },
      }),
    ]);

    res.status(200).send({
      message: "스터디가 삭제되었습니다!",
      data: updatedStudy,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteStudy;
