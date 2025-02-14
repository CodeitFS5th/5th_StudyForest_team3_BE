import prisma from "../../prisma";
import { RequestHandler } from "express";

const createHabit: RequestHandler = async (req, res, next) => {
  try {
    const studyId = Number(req.params.id);
    const { name } = req.body;

    if (!studyId || !name) {
      res.status(400).json({ message: "studyId와 name이 필요합니다." });
      return;
    }

    const newHabit = await prisma.habit.create({
      data: {
        studyId: studyId,
        name,
      },
    });

    res.status(201).json({
      message: "새로운 습관이 생성되었습니다.",
      habit: newHabit,
    });
  } catch (error) {
    next(error);
  }
};

export default createHabit;
