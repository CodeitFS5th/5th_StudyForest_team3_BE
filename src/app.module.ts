import { Module } from '@nestjs/common';
import { StudyModule } from './study/study.module';
import { HabitModule } from './habit/habit.module';

@Module({
  imports: [StudyModule, HabitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
