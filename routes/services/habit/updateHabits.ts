import prisma from "../../prisma";
import { RequestHandler } from "express";
import _ from "lodash";

const updateHabits: RequestHandler = async (req, res, next) => {
  const habits = req.body as {
    id: number | string;
    name: string;
  }[];
  const studyId = Number(req.params.id);

  try {
    // 습관 데이터 유효성 검사
    if (!Array.isArray(habits)) {
      res
        .status(400)
        .send({ message: "습관 목록이 배열 형태로 전달되어야 합니다." });
      return;
    }

    // 기존 습관 불러오기
    const originHabits = await prisma.habit.findMany({
      where: {
        studyId,
      },
    });

    const deletedHabits = _.differenceBy(originHabits, habits, "id"); // 삭제된 습관
    const newHabits = _.differenceBy(habits, originHabits, "id"); // 새로운 습관
    const commonHabits = _.intersectionBy(habits, originHabits, "id");
    const updatedHabits = _.filter(commonHabits, (habit) => {
      const originHabit = _.find(originHabits, { id: Number(habit.id) });
      if (!originHabit) return false; // ✅ undefined일 경우 즉시 리턴하여 오류 방지
      return originHabit.name !== habit.name; // ✅ 여기선 originHabit이 확실히 존재함
    });

    // 새로운 습관 생성
    for (const habit of newHabits) {
      await prisma.habit.create({
        data: { name: habit.name, studyId: studyId },
      });
    }

    // 습관 이름 수정
    for (const habit of updatedHabits) {
      await prisma.habit.update({
        where: { id: Number(habit.id) },
        data: { name: habit.name },
      });
    }

    // 삭제된 습관 처리
    for (const habit of deletedHabits) {
      await prisma.$transaction([
        // 습관 기록 먼저 삭제
        prisma.habitLog.deleteMany({
          where: {
            habitId: habit.id,
          },
        }),

        // DeletedHabit 테이블에 저장
        prisma.deletedHabit.create({
          data: {
            habitId: habit.id,
            name: habit.name,
            studyId: habit.studyId,
          },
        }),

        // 원본 습관 테이블에서 삭제
        prisma.habit.delete({
          where: { id: habit.id },
        }),
      ]);
    }

    const afterHabits = await prisma.habit.findMany({
      where: {
        studyId: studyId,
      },
    });

    res.send(afterHabits);
  } catch (error) {
    next(error);
  }
};

export default updateHabits;
