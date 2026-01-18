import { Controller, Get, Post, Body, Param, Query, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body() data: Partial<Task>,
    @Query('files') filePaths?: string[],
  ): Promise<Task> {
    return this.taskService.create(data, filePaths);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.taskService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, data);
  }
}
