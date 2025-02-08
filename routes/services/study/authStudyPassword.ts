import { RequestHandler } from "express";
import prisma from "../../prisma";
import bcrypt from "bcrypt";

const authStudyPassword: RequestHandler = async (req, res, next) => {
  // 스터디 비밀번호 인증
  try {
    const { studyId, password } = req.body;

    if (!password) {
      res.status(400).send({ message: "비밀번호가 필요합니다." });
      return;
    }

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
    });

    if (!study) {
      res.status(404).send({ message: "해당 스터디가 존재하지 않습니다." });
      return;
    }

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, study.password);

    if (isPasswordValid) {
      res.status(200).send({ message: "비밀번호가 일치합니다." });
    } else {
      res.status(401).send({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    next(error);
  }
};

export default authStudyPassword;
