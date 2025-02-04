import prisma from "../../prisma";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import * as s from "superstruct";
import { CreateStudy } from "../../../struct";

type IStudyBody = s.Infer<typeof CreateStudy>;

const createStudy: RequestHandler = async (req, res, next) => {
  // 스터디 만들기
  try {
    s.assert(req.body, CreateStudy);

    const { nick, name, description, password, background }: IStudyBody =
      req.body;

    if (!nick || !name || !description || !password || !background) {
      res
        .status(400)
        .send({ message: "스터디 생성 필수 요소가 누락되었습니다." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const study = await prisma.study.create({
      data: {
        nick,
        name,
        description,
        password: hashedPassword,
        background,
      },
    });

    res.status(201).send(study);
  } catch (error) {
    next(error);
  }
};

export default createStudy;
