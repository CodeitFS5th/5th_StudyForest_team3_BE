import prisma from "../../prisma";
import { RequestHandler } from "express";

const getStudy: RequestHandler = async (req, res, next) => {
  // 스터디 상세 조회
  try {
    const studyId: number = Number(req.params.id);

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
    });

    if (!study) {
      res.status(404).send("스터디가 존재하지 않습니다!");
      return;
    }

    res.status(200).send(study);
  } catch (error) {
    next(error);
  }
};

export default getStudy;
