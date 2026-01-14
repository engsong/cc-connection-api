import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from './homework.entity';
import { Subject } from '../subjects/subject.entity';
import { Lesson } from '../lessons/lesson.entity';
import { LessonInfo } from '../lesson_info/lesson-info.entity';
import { Branch } from '../branch/branch.entity';
import { CreateHomeworkDto, UpdateHomeworkDto } from './dto/homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>,
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    @InjectRepository(LessonInfo)
    private readonly lessonInfoRepo: Repository<LessonInfo>,
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
  ) {}

  async createHomework(dto: CreateHomeworkDto) {
  const subject = await this.subjectRepo.findOne({ where: { id: Number(dto.subject_id) } });
  const lesson = await this.lessonRepo.findOne({ where: { id: Number(dto.lesson_id) } });
  const lesson_info = await this.lessonInfoRepo.findOne({ where: { id: Number(dto.lesson_info_id) } });
  const branch = await this.branchRepo.findOne({ where: { id: String(dto.branch_id) } });

  if (!subject || !lesson || !lesson_info || !branch) {
    throw new NotFoundException('Related entity not found');
  }

  const hw = this.homeworkRepo.create({
    subject,
    lesson,
    lesson_info,
    branch,
    score: dto.score,
    deadline: dto.deadline ? new Date(dto.deadline) : undefined,
  });

  return this.homeworkRepo.save(hw);
}

  async getAllHomework() {
    return this.homeworkRepo.find({
      relations: ['subject', 'lesson', 'lesson_info', 'branch'],
    });
  }

  async getHomeworkById(id: number) {
    const hw = await this.homeworkRepo.findOne({
      where: { id },
      relations: ['subject', 'lesson', 'lesson_info', 'branch'],
    });
    if (!hw) throw new NotFoundException('Homework not found');
    return hw;
  }

 async updateHomework(id: number, dto: UpdateHomeworkDto) {
  const hw = await this.getHomeworkById(id);
  if (!hw) throw new NotFoundException(`Homework with id ${id} not found`);

  // Update relations if id provided
  if (dto.subject_id) {
    const subject = await this.subjectRepo.findOne({ where: { id: Number(dto.subject_id) } });
    if (!subject) throw new NotFoundException(`Subject with id ${dto.subject_id} not found`);
    hw.subject = subject;
  }

  if (dto.lesson_id) {
    const lesson = await this.lessonRepo.findOne({ where: { id: Number(dto.lesson_id) } });
    if (!lesson) throw new NotFoundException(`Lesson with id ${dto.lesson_id} not found`);
    hw.lesson = lesson;
  }

  if (dto.lesson_info_id) {
    const lessonInfo = await this.lessonInfoRepo.findOne({ where: { id: Number(dto.lesson_info_id) } });
    if (!lessonInfo) throw new NotFoundException(`LessonInfo with id ${dto.lesson_info_id} not found`);
    hw.lesson_info = lessonInfo;
  }

  if (dto.branch_id) {
    const branch = await this.branchRepo.findOne({ where: { id: String(dto.branch_id) } });
    if (!branch) throw new NotFoundException(`Branch with id ${dto.branch_id} not found`);
    hw.branch = branch;
  }

  if (dto.score !== undefined) hw.score = dto.score;
  if (dto.deadline !== undefined) hw.deadline = dto.deadline ? new Date(dto.deadline) : undefined;

  return this.homeworkRepo.save(hw);
}


  async deleteHomework(id: number) {
    const hw = await this.getHomeworkById(id);
    return this.homeworkRepo.remove(hw);
  }
}
