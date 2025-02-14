import prisma from "../../prisma";
import { RequestHandler } from "express";

const getStudyList: RequestHandler = async (req, res, next) => {
  try {
    // 쿼리 파라미터에서 페이지네이션 정보 추출
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // 검색어와 정렬 옵션 추출
    const search = req.query.search as string;
    const sort = req.query.sort as string;

    // 검색 조건 설정
    const whereCondition: any = {
      deletedAt: null,
    };

    if (search) {
      whereCondition.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // 정렬 조건 설정
    const orderByCondition: any = {};
    switch (sort) {
      case "point_asc":
        orderByCondition.point = "asc";
        break;
      case "point_desc":
        orderByCondition.point = "desc";
        break;
      case "date_asc":
        orderByCondition.createdAt = "asc";
        break;
      case "date_desc":
      default:
        orderByCondition.createdAt = "desc";
        break;
    }

    // 삭제되지 않은 스터디 목록 조회
    const studies = await prisma.study.findMany({
      where: whereCondition,
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        background: true,
        point: true,
        createdAt: true,
        reactions: true,
      },
      orderBy: orderByCondition,
      skip,
      take: limit,
    });

    // 전체 스터디 수 조회
    const totalStudies = await prisma.study.count({
      where: whereCondition,
    });

    res.json({
      studies,
      totalCount: totalStudies,
    });
  } catch (error) {
    next(error);
  }
};

export default getStudyList;
