import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { FileService } from '../file/file.service';
import { File } from '../file/files.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    private readonly fileService: FileService,
  ) {}

  async create(data: Partial<Task>, filePaths?: string[]): Promise<Task> {
    const newTask = this.taskRepo.create(data);
    const savedTask = await this.taskRepo.save(newTask);

    if (filePaths && filePaths.length > 0) {
      for (const path of filePaths) {
        await this.fileService.create({
          module: 'task',
          task_id: savedTask.id,
          file_path: path,
        } as Partial<File>);
      }
    }

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find({ where: {} });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await this.findOne(id);
    await this.taskRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<{ message: string }> {
    const task = await this.findOne(id);
    // optional: you can implement soft delete
    await this.taskRepo.remove(task);
    return { message: 'Task deleted' };
  }
}
