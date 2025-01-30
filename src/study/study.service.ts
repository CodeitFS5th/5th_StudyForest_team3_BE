import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudyService {
  constructor(private readonly prisma: PrismaService) {}

  async getStudyList({ limit, cursor, sort, keyword }) {
    const parsedLimit = parseInt(limit, 10) || 10;
    const parsedCursor = parseInt(cursor) || undefined;
    const parsedSort = sort || 'cdesc';
    const parsedKeyword = keyword || undefined;

    let orderBy;
    switch (parsedSort) {
      case 'casc':
        orderBy = { createdAt: 'asc' };
        break;
      case 'cdesc':
        orderBy = { createdAt: 'desc' };
        break;
      case 'pasc':
        orderBy = { point: 'asc' };
        break;
      case 'pdesc':
        orderBy = { point: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' }; // 기본적으로 createdAt 내림차순
    }

    return this.prisma.study.findMany({
      where: parsedKeyword ? {
        OR: [{ name: { contains: parsedKeyword, mode: 'insensitive' } }]
      } : undefined,
      take: parsedLimit,
      skip: parsedCursor ? 1: 0,
      cursor: parsedCursor ? { id: parsedCursor } : undefined,
      orderBy,
    })
  }
  async createStudy(createStudyDto: Prisma.StudyCreateInput) {
    return this.prisma.study.create({
      data: createStudyDto
    })
  }
  async getStudyById({ studyId }) {
    const parsedId = parseInt(studyId, 10);
    return this.prisma.study.findUnique({
      where: { id: parsedId }
    })
  }
  async deleteStudyById({ studyId }) {
    const parsedId = parseInt(studyId, 10);
    return this.prisma.study.delete({
      where: { id: parsedId }
    })
  }
  async updateStudy({ studyId, updateStudyDto }) {
    const parsedId = parseInt(studyId, 10);
    return this.prisma.study.update({
      where: { id: parsedId },
      data: updateStudyDto,
    })
  }
}
