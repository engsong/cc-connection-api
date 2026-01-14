import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { LessonInfoService } from './lesson-info.service';
import { Lesson } from '../lessons/lesson.entity';

@Controller('lesson-info')
export class LessonInfoController {
  constructor(private readonly lessonInfoService: LessonInfoService) {}

  @Post()
  async create(@Body() body: {
    lessonId: number;
    is_evaluation?: boolean;
    evaluation_max_score?: number;
    evaluation_sample?: string;
    lesson_info_no?: string;
    title?: string;
    info?: string;
    info_image?: string;
  }) {
    const lesson = new Lesson();
    lesson.id = body.lessonId;
    return this.lessonInfoService.createLessonInfo(lesson, body);
  }

  @Get()
  async findAll() {
    return this.lessonInfoService.getAllLessonInfos();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.lessonInfoService.getLessonInfoById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Partial<any>) {
    return this.lessonInfoService.updateLessonInfo(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.lessonInfoService.deleteLessonInfo(id);
  }
}
