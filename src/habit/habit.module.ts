import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController, StudyHabitController } from './habit.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [HabitService, PrismaService],
  controllers: [HabitController, StudyHabitController]
})
export class HabitModule {}
