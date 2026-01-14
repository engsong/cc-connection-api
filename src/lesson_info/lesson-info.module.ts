import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonInfo } from './lesson-info.entity';
import { LessonInfoController } from './lesson-info.controller';
import { LessonInfoService } from './lesson-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonInfo])],
  controllers: [LessonInfoController],
  providers: [LessonInfoService],
})
export class LessonInfoModule {}
