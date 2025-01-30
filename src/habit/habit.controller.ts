import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HabitService } from './habit.service';
import { Prisma } from '@prisma/client';

@Controller('studies/:studyId/habit')
export class StudyHabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  async getHabits(@Param('studyId') studyId: string) {
    return this.habitService.getHabits({ studyId });
  }

  @Post()
  async createHabit(@Param('studyId') studyId: string, @Body() body: Prisma.HabitCreateInput ) {
    return this.habitService.createHabit( studyId, body );
  }
}

@Controller('habits/:habitId')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Delete()
  async deleteHabit(@Param('habitId') habitId: string) {
    return this.habitService.deleteHabit( habitId )
  }

  @Put()
  async updateHabit(@Param('habitId') habitId: string, @Body() body: Prisma.HabitUpdateInput) {
    return this.habitService.updateHabit( habitId, body );
  }
}