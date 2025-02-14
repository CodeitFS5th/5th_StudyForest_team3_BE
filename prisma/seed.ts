import { PrismaClient, ImageType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("데이터베이스 초기화 중...");

  // 기존 데이터 삭제
  await prisma.deletedHabit.deleteMany();
  await prisma.habitLog.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.studyDeleteLog.deleteMany();
  await prisma.study.deleteMany();

  console.log("기존 데이터 삭제 완료");

  // 테스트 데이터 생성
  const studyData = [
    {
      nick: "알고리즘마스터",
      name: "코딩테스트 준비",
      description: "매일 알고리즘 문제 3개씩 풀기",
      password: "1234",
      background: "GREEN",
      point: 150,
      habits: [
        { name: "백준 골드 문제 풀기", status: "UNDONE" },
        { name: "프로그래머스 Lv.3 풀기", status: "DONE" },
        { name: "알고리즘 개념 정리하기", status: "UNDONE" },
      ],
      reactions: {
        "👍": 5,
        "🔥": 3,
        "💪": 7,
        "🎉": 4,
        "❤️": 6,
        "🌟": 2,
      },
    },
    {
      nick: "CS지식킹",
      name: "기술 면접 준비",
      description: "CS 지식 마스터하기",
      password: "5678",
      background: "BLUE",
      point: 120,
      habits: [
        { name: "운영체제 공부", status: "DONE" },
        { name: "네트워크 공부", status: "UNDONE" },
        { name: "데이터베이스 공부", status: "UNDONE" },
      ],
      reactions: { "👍": 8, "🎯": 4, "📚": 6, "🧠": 5, "💡": 7, "✨": 3 },
    },
    {
      nick: "영어천재",
      name: "토익 900점 도전",
      description: "매일 영어 공부 2시간씩 하기",
      password: "9012",
      background: "RED",
      point: 80,
      habits: [
        { name: "토익 단어 50개 암기", status: "DONE" },
        { name: "토익 RC 5문제 풀기", status: "DONE" },
        { name: "토익 LC 듣기 연습", status: "UNDONE" },
      ],
      reactions: { "✨": 4, "💯": 2, "🌟": 5, "📝": 6, "🎓": 3, "🔤": 4 },
    },
    {
      nick: "헬스매니아",
      name: "헬스 3개월 챌린지",
      description: "매일 헬스장 가기",
      password: "3456",
      background: "YELLOW",
      point: 200,
      habits: [
        { name: "웨이트 트레이닝", status: "DONE" },
        { name: "유산소 운동", status: "UNDONE" },
        { name: "스트레칭", status: "DONE" },
      ],
      reactions: { "💪": 10, "🔥": 6, "👍": 8, "🏃": 5, "🎽": 4, "⚡": 7 },
    },
    {
      nick: "독서광",
      name: "한 달에 책 5권 읽기",
      description: "매일 독서 1시간",
      password: "7890",
      background: "RED",
      point: 90,
      habits: [
        { name: "소설 읽기", status: "DONE" },
        { name: "자기계발서 읽기", status: "UNDONE" },
        { name: "역사책 읽기", status: "UNDONE" },
      ],
      reactions: { "📚": 7, "✨": 3, "👍": 5, "🤓": 4, "📖": 6, "💭": 2 },
    },
    {
      nick: "요리사",
      name: "요리 마스터하기",
      description: "매주 새로운 요리 도전",
      password: "1122",
      background: "YELLOW",
      point: 110,
      habits: [
        { name: "레시피 연구", status: "DONE" },
        { name: "재료 손질", status: "UNDONE" },
        { name: "요리 실습", status: "DONE" },
      ],
      reactions: { "🍳": 6, "👍": 4, "👏": 5, "🔪": 3, "👨‍🍳": 7, "🍽️": 4 },
    },
    {
      nick: "여행자",
      name: "세계 여행 계획",
      description: "여행 계획 세우기",
      password: "3344",
      background: "GREEN",
      point: 130,
      habits: [
        { name: "여행지 조사", status: "DONE" },
        { name: "여행 경비 계산", status: "UNDONE" },
        { name: "여행 일정 짜기", status: "DONE" },
      ],
      reactions: { "🌍": 9, "✈️": 5, "📅": 6, "🎒": 4, "🗺️": 7, "🌴": 3 },
    },
  ];

  console.log("테스트 데이터 생성 중...");

  for (const study of studyData) {
    const createdStudy = await prisma.study.create({
      data: {
        nick: study.nick,
        name: study.name,
        description: study.description,
        password: await bcrypt.hash(study.password, 10),
        background: study.background as ImageType,
        reactions: study.reactions,
        point: study.point,
        habits: {
          create: study.habits.map((habit) => ({
            name: habit.name,
          })),
        },
      },
    });

    // 각 스터디의 습관들에 대한 로그 생성
    const habits = await prisma.habit.findMany({
      where: { studyId: createdStudy.id },
    });

    for (const habit of habits) {
      // 각 습관당 3-7개의 랜덤한 로그 생성
      const logCount = Math.floor(Math.random() * 5) + 3;

      for (let i = 0; i < logCount; i++) {
        await prisma.habitLog.create({
          data: {
            habitId: habit.id,
            // 최근 7일 이내의 랜덤한 날짜 생성
            createdAt: new Date(
              Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
            ),
          },
        });
      }
    }

    // 삭제된 습관 데이터 생성 (테스트용)
    const deletedHabit = await prisma.deletedHabit.create({
      data: {
        habitId: 1,
        name: "삭제된 습관",
        studyId: createdStudy.id,
      },
    });

    // 스터디 삭제 로그 생성 (테스트용)
    const studyDeleteLog = await prisma.studyDeleteLog.create({
      data: {
        studyId: createdStudy.id,
      },
    });

    console.log(`스터디 생성 완료: ${study.name}`);
  }

  // 결과 요약
  const summary = await prisma.$transaction([
    prisma.study.count(),
    prisma.habit.count(),
    prisma.deletedHabit.count(),
    prisma.studyDeleteLog.count(),
  ]);

  console.log("\n=== 데이터 생성 결과 ===");
  console.log(`스터디: ${summary[0]}개`);
  console.log(`습관: ${summary[1]}개`);
  console.log(`삭제된 습관: ${summary[2]}개`);
  console.log(`스터디 삭제 로그: ${summary[3]}개`);
}

main()
  .catch((e) => {
    console.error("에러 발생:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
