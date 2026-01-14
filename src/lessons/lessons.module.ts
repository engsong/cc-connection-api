import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './lesson.entity';
import { Subject } from '../subjects/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Subject])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
