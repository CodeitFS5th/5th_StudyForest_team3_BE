import prisma from "../../prisma";
import { RequestHandler } from "express";

const addFocusPoint: RequestHandler = async (req, res, next) => {
  try {
    const { studyId, duration } = req.body;

    if (!studyId || !duration) {
      res.status(400).json({ message: "studyId와 duration이 필요합니다." });
      return;
    }

    const pointsToAdd = 3 + Math.floor(duration / 10);

    const updatedStudy = await prisma.study.update({
      where: { id: studyId },
      data: { point: { increment: pointsToAdd } },
    });

    res.status(200).json({
      message: "집중 완료, 포인트가 추가되었습니다.",
      addedPoints: pointsToAdd,
      totalPoints: updatedStudy.point,
    });

    return;
  } catch (error) {
    next(error);
  }
};

export default addFocusPoint;
