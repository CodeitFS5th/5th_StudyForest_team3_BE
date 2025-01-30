import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HabitService {
  constructor(private readonly prisma: PrismaService) {}

  async getHabits({ studyId }) {
    const parsedStudyId = parseInt(studyId, 10);
    return this.prisma.habit.findMany({
      where: { studyId: parsedStudyId },
    })
  }

  async createHabit(studyId: string, body: Prisma.HabitCreateInput ) {
    const parsedStudyId = parseInt(studyId, 10);
    return this.prisma.habit.create({
      data: {
        studyId: parsedStudyId,
        name: body.name,
      },
    })
  }

  async deleteHabit(habitId: string) {
    const parsedHabitId = parseInt(habitId, 10);
    return this.prisma.habit.delete({
      where: { id: parsedHabitId}
    })
  }

  async updateHabit(habitId: string, body: Prisma.HabitUpdateInput ) {
    const parsedHabitId = parseInt(habitId, 10);
    return this.prisma.habit.update({
      where: { id: parsedHabitId },
      data: body,
    })
  }
}
