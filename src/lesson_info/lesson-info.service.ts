import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonInfo } from './lesson-info.entity';
import { Lesson } from '../lessons/lesson.entity';

@Injectable()
export class LessonInfoService {
  constructor(
    @InjectRepository(LessonInfo)
    private lessonInfoRepository: Repository<LessonInfo>,
  ) {}

  async createLessonInfo(lesson: Lesson, data: Partial<LessonInfo>) {
    const lessonInfo = this.lessonInfoRepository.create({ ...data, lesson });
    return this.lessonInfoRepository.save(lessonInfo);
  }

  async getAllLessonInfos() {
    return this.lessonInfoRepository.find({ relations: ['lesson'] });
  }

  async getLessonInfoById(id: number) {
    return this.lessonInfoRepository.findOne({ where: { id }, relations: ['lesson'] });
  }

  async updateLessonInfo(id: number, updateData: Partial<LessonInfo>) {
    await this.lessonInfoRepository.update(id, updateData);
    return this.getLessonInfoById(id);
  }

  async deleteLessonInfo(id: number) {
    return this.lessonInfoRepository.delete(id);
  }
}
