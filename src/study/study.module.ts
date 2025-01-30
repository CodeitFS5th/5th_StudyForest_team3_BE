import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [StudyService, PrismaService],
  controllers: [StudyController]
})
export class StudyModule {}
