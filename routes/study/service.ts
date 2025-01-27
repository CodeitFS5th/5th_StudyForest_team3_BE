import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import * as s from "superstruct";
import { CreateStudy } from "../../struct";

const prisma = new PrismaClient();

export const getStudyList: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getStudy: RequestHandler = async (req, res, next) => {
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

type IStudyBody = s.Infer<typeof CreateStudy>;

export const createStudy: RequestHandler = async (req, res, next) => {
  // 스터디 만들기
  try {
    s.assert(req.body, CreateStudy);

    const { nick, name, description, password, background }: IStudyBody =
      req.body;

    if (!nick || !name || !description || !password || !background) {
      res.status(400).send("스터디 생성 필수 요소가 누락되었습니다.");
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

export const updateStudy: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const deleteStudy: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const addFocusPoint: RequestHandler = async (req, res, next) => {
  // study id, point 등등 body로 받아서 추가
  try {
  } catch (error) {
    next(error);
  }
};
