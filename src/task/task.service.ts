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

  async create(data: CreateTaskDto, filePaths?: string[]): Promise<Task> {
    const { student_id, ...taskData } = data;

    const newTask = this.taskRepo.create({
      ...taskData,
      student: student_id ? ({ id: student_id } as any) : null,
    });

    const savedTask = await this.taskRepo.save(newTask);

    if (filePaths?.length) {
      for (const path of filePaths) {
        await this.fileService.create({
          module: 'task',
          task_id: savedTask.id,
          file_path: path,
        } as any);
      }
    }

    return this.findOne(savedTask.id);
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
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (data.student_id) {
      task.student = { id: data.student_id } as any;
      delete data.student_id;
    }

    Object.assign(task, data);
    await this.taskRepo.save(task);

    return this.findOne(id);
  }

  async delete(id: string): Promise<{ message: string }> {
    const task = await this.findOne(id);
    await this.taskRepo.remove(task);
    return { message: 'Task deleted' };
  }
}
