import { ErrorRequestHandler } from "express";
import { StructError } from "superstruct";
import { Prisma } from "@prisma/client";

// 오류 처리 미들웨어
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Prisma 오류 처리
  // npx prisma generate 명령어로 생성된 PrismaClientKnownRequestError를 사용 // DB 연결하면 오류 사라질 듯?
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Prisma의 구체적인 오류 코드를 체크할 수 있음
    if (err.code === "P2002") {
      return res.status(400).send({ message: "이미 존재하는 항목입니다." });
    }
    return res.status(400).send({ message: `Prisma 오류: ${err.message}` });
  }

  // StructError 처리
  if (err instanceof StructError) {
    return res.status(400).send({ message: err.message });
  }

  // 기타 오류 처리
  res.status(500).send({ message: "서버 오류가 발생했습니다." });
};

export default errorHandler;
