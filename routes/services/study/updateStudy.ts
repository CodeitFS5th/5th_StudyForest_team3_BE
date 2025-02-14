import prisma from "../../prisma";
import { RequestHandler } from "express";
import * as s from "superstruct";
import { PatchStudy } from "../../../struct";

const updateStudy: RequestHandler = async (req, res, next) => {
  try {
    // id 값 불러오기
    const studyId = Number(req.params.id);
    const { nick, name, description, password, background, point } = req.body;

    const study = await prisma.study.findFirst({
      where: {
        id: studyId,
      },
    });

    if (!study) {
      res.status(404).send({ message: "스터디가 존재하지 않습니다!" });
    }

    // 바디에 최소 한개 값은 있어야 함.
    if (!nick && !name && !description && !password && !background && !point) {
      res
        .status(400)
        .send({ message: "바디의 값 중에 하나 최소 한개 값은 있어야 합니다." });
      return;
    }

    // body에 있는 값으로 DB 업데이트
    const updatedStudy = await prisma.study.update({
      where: {
        id: studyId,
      },
      data: req.body,
    });

    res.status(200).send(updatedStudy);
  } catch (error) {
    next(error);
  }
};

export default updateStudy;
