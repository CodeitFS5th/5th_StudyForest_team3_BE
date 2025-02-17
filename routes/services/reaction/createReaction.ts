import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

type Reaction = Record<string, number>;

const prisma = new PrismaClient();

const createReaction: RequestHandler = async (req, res, next) => {
  try {
    const studyId = Number(req.params.id);
    const emoji = req.body.emoji;

    if (!studyId || !emoji) {
      res.status(400).json({ message: "studyId와 emoji가 필요합니다." });
      return;
    }

    const study = await prisma.study.findUnique({
      where: { id: studyId },
      select: { reactions: true },
    });

    if (!study) {
      res.status(404).json({ message: "해당 스터디를 찾을 수 없습니다." });
      return;
    }

    const reactions: Reaction = (study.reactions as Reaction) ?? {};

    // 이모지가 이미 있으면 개수 증가, 없으면 1로 설정
    reactions[emoji] = (reactions[emoji] || 0) + 1;

    await prisma.study.update({
      where: { id: studyId },
      data: { reactions },
    });

    res.status(201).send(reactions);
  } catch (error) {
    next(error);
  }
};

export default createReaction;
