import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StudyService } from './study.service';
import { Prisma } from '@prisma/client';

@Controller('studies')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Get()
  async getStudyList(
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
    @Query('sort') sort?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.studyService.getStudyList({ limit, cursor, sort, keyword });
  }

  @Post()
  async createStudy(@Body() createStudyDto: Prisma.StudyCreateInput ) {
    return this.studyService.createStudy( createStudyDto );
  }

  @Get(':studyId')
  async getStudyById(@Param('studyId') studyId: string) {
    return this.studyService.getStudyById({ studyId })
  }

  @Delete(':studyId')
  async deleteStudy(@Param('studyId') studyId: string) {
    return this.studyService.deleteStudyById({ studyId });
  }

  @Put(':studyId')
  async updateStudy(@Param('studyId') studyId: string, @Body() updateStudyDto: Prisma.StudyUpdateInput ) {
    return this.studyService.updateStudy({ studyId, updateStudyDto });
  }
}
