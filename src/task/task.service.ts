import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { FileService } from '../file/file.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    private readonly fileService: FileService,
  ) {}

  async create(
    data: CreateTaskDto,
    files?: Express.Multer.File[],
  ): Promise<Task> {
    const { student_id, ...taskData } = data;

    // สร้าง Task
    const newTask = this.taskRepo.create({
      ...taskData,
      student: student_id ? ({ id: student_id } as any) : null,
      added_by_id: data.added_by_id,
      added_by_type: data.added_by_type,
    });

    const savedTask = await this.taskRepo.save(newTask);

    // Save multiple files
    if (files?.length) {
      for (const file of files) {
        if (!file.path) continue; // skip if no path
        await this.fileService.create({
          module: 'task',
          task_id: savedTask.id,
          file_path: file.path,
        } as any);
      }
    }

    const task = await this.taskRepo.findOne({
      where: { id: savedTask.id },
      relations: ['student', 'files'],
    });

    if (!task) {
      throw new NotFoundException('Task not found after saving');
    }

    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find({
      relations: ['student', 'files'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['student', 'files'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task; // ตอนนี้ guaranteed non-null
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id); // findOne already throws NotFoundException

    if (data.student_id) {
      task.student = { id: data.student_id } as any;
      delete data.student_id;
    }

    // แปลง deadline ถ้าเป็น string ให้เป็น Date
    if (data.deadline) {
      task.deadline = new Date(data.deadline);
    }

    Object.assign(task, data); // copy property อื่น ๆ
    await this.taskRepo.save(task);

    return this.findOne(id);
  }

  async delete(id: string): Promise<{ message: string }> {
    const task = await this.findOne(id);
    await this.taskRepo.remove(task);
    return { message: 'Task deleted' };
  }
}
