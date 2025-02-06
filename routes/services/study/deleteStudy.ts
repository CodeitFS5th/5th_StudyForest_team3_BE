import { equal } from "assert";
import prisma from "../../prisma";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
interface DeleteStudyRequest {
  studyPassword: string;
  reason?: string;
}

const deleteStudy: RequestHandler = async (req, res, next) => {
  try {
    const studyId: number = Number(req.params.id); // uuid로 변경 시 타입 변경 필요
    const { studyPassword, reason } = req.body as DeleteStudyRequest;

    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
        deleted_at: {
          equals: null,
          // DateTime 필드에서는 equals, lt, gt, gte, lte와 같은 연산자를 사용해야 합니다.
          // undefined 값은 Prisma에서 자동으로 처리되지 않기 때문에, undefined 조건을 포함하는 쿼리는 작성할 수 없습니다.
        },
      },
    });

    // Error: 삭제할 스터디가 존재하지 않으면 에러 발생
    if (!study) {
      res.status(404).send({ message: "삭제할 스터디가 존재하지 않습니다!" });
      return;
    }

    // Error: studyPassword를 req.body에서 받지 않으면 에러 발생
    if (!studyPassword) {
      res.status(400).send({ message: "스터디 비밀번호가 없습니다!" });
      return;
    }

    // Error: studyPassword가 일치하지 않으면 에러 발생
    const isPasswordValid = await bcrypt.compare(studyPassword, study.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: "스터디 비밀번호가 일치하지 않습니다!" });
      return;
    }

    const now = new Date();

    const [updatedStudy, createdDeleteLog] = await prisma.$transaction([
      prisma.study.update({
        where: {
          id: studyId,
        },
        data: {
          deleted_at: now,
        },
        select: {
          id: true,
          nick: true,
          name: true,
          description: true,
          deleted_at: true,
        },
      }),
      prisma.studyDeleteLog.create({
        data: {
          study_id: studyId,
          deleted_at: now,
          ...(reason && { reason }),
        },
      }),
    ]);

    res.status(200).send({
      message: "스터디가 삭제되었습니다!",
      data: { ...updatedStudy, ...(reason && { reason }) },
    });
  } catch (error) {
    next(error);
  }
};

export default deleteStudy;
