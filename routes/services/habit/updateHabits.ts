import prisma from "../../prisma";
import { RequestHandler } from "express";

const updateHabits: RequestHandler = async (req, res, next) => {
  try {
    const habits = req.body as { id: number | null; name: string }[];
    const studyId = Number(req.params.id);

    // 습관 데이터 유효성 검사
    if (!Array.isArray(habits)) {
      res
        .status(400)
        .send({ message: "습관 목록이 배열 형태로 전달되어야 합니다." });
      return;
    }

    // 전체 습관 불러오기
    const allHabits = await prisma.habit.findMany({
      where: {
        studyId: studyId,
      },
    });

    // habits 배열에 있는 id 값과 일치하는 습관 찾기
    const habitsToUpdate = allHabits.filter((habit) =>
      // id는 같지만 title은 다른 경우
      habits.some((h) => h.id === habit.id && h.name !== habit.name)
    );

    const newHabits = habits.filter(
      (h) => !habitsToUpdate.some((h2) => h2.id === h.id)
    );

    // 새로운 습관 생성
    for (const habit of newHabits) {
      await prisma.habit.create({
        data: { name: habit.name, studyId: studyId },
      });
    }

    // body에 없는 습관 필터링 하기
    const deletedHabits = allHabits.filter(
      (h) => !habits.some((h2) => h2.id === h.id)
    );

    // DB에 업데이트 하기
    for (const habit of habitsToUpdate) {
      await prisma.habit.update({
        where: { id: habit.id },
        data: { name: habit.name },
      });
    }

    // 삭제된 습관들 처리
    for (const habit of deletedHabits) {
      console.log(habit);
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

    const updatedHabits = await prisma.habit.findMany({
      where: {
        studyId: studyId,
      },
    });

    res.send(updatedHabits);
  } catch (error) {
    next(error);
  }
};

export default updateHabits;
