import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, AuditorType, ModuleType } from './comments.entity';
import { Admin } from '../admin/admin.entity';
import { Parent } from '../parents/parent.entity';
import { Task } from '../task/task.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(Parent)
    private parentRepo: Repository<Parent>,

    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  // Create comment
  async create(dto: CreateCommentDto) {
    // ตรวจสอบ auditor
    if (dto.auditor_type === AuditorType.ADMIN) {
      const admin = await this.adminRepo.findOne({ where: { id: dto.auditor_id } });
      if (!admin) throw new NotFoundException('Admin not found');
    } else if (dto.auditor_type === AuditorType.PARENT) {
      const parent = await this.parentRepo.findOne({ where: { id: dto.auditor_id } });
      if (!parent) throw new NotFoundException('Parent not found');
    }

    // ตรวจสอบ module
    if (dto.module_type === ModuleType.TASK) {
      const task = await this.taskRepo.findOne({ where: { id: dto.module_id } as any }); // cast เป็น any เพื่อ TypeScript ผ่าน
      if (!task) throw new NotFoundException('Task not found');
    } else if (dto.module_type === ModuleType.EVENT) {
      const event = await this.eventRepo.findOne({ where: { id: dto.module_id } as any }); // cast เป็น any
      if (!event) throw new NotFoundException('Event not found');
    }

    // สร้าง comment
    const comment = this.commentRepo.create({
      comment: dto.comment,
      auditor_id: dto.auditor_id,
      auditor_type: dto.auditor_type,
      module_id: dto.module_id, // string
      module_type: dto.module_type,
    });

    return this.commentRepo.save(comment);
  }

  async update(id: string, dto: Partial<CreateCommentDto>) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');

    if (dto.comment !== undefined) comment.comment = dto.comment;
    if (dto.auditor_id !== undefined) comment.auditor_id = dto.auditor_id;
    if (dto.auditor_type !== undefined) comment.auditor_type = dto.auditor_type;
    if (dto.module_id !== undefined) comment.module_id = dto.module_id;
    if (dto.module_type !== undefined) comment.module_type = dto.module_type;

    return this.commentRepo.save(comment);
  }

 async findAll(module_type?: ModuleType, module_id?: string) {
  const query = this.commentRepo.createQueryBuilder('comment');

  if (module_type) {
    query.andWhere('comment.module_type = :module_type', { module_type });
  }

  if (module_id) {
    query.andWhere('comment.module_id = :module_id', { module_id });
  }

  return query.getMany();
}

  async findOne(id: string) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async remove(id: string) {
    const comment = await this.findOne(id);
    return this.commentRepo.remove(comment);
  }
}
