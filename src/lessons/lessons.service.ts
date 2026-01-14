import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Subject } from '../subjects/subject.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,

    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async create(createDto: CreateLessonDto): Promise<Lesson> {
    const subject = await this.subjectRepo.findOne({ where: { id: createDto.subject_id } });
    if (!subject) throw new NotFoundException(`Subject with id ${createDto.subject_id} not found`);

    const lesson = this.lessonRepo.create({ ...createDto, subject });
    return this.lessonRepo.save(lesson);
  }

  findAll(): Promise<Lesson[]> {
    return this.lessonRepo.find({ relations: ['subject'] });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ where: { id }, relations: ['subject'] });
    if (!lesson) throw new NotFoundException(`Lesson with id ${id} not found`);
    return lesson;
  }

  async update(id: number, updateDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);

    if (updateDto.subject_id) {
      const subject = await this.subjectRepo.findOne({ where: { id: updateDto.subject_id } });
      if (!subject) throw new NotFoundException(`Subject with id ${updateDto.subject_id} not found`);
      lesson.subject = subject;
      lesson.subject_id = subject.id;
    }

    Object.assign(lesson, updateDto);
    return this.lessonRepo.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepo.remove(lesson);
  }
}
