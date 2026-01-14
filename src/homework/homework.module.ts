import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { Homework } from './homework.entity';
import { Subject } from '../subjects/subject.entity';
import { Lesson } from '../lessons/lesson.entity';
import { LessonInfo } from '../lesson_info/lesson-info.entity';
import { Branch } from '../branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homework, Subject, Lesson, LessonInfo, Branch])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
