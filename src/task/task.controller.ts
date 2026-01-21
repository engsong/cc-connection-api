import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // ใช้ FilesInterceptor สำหรับ multipart form-data
  @Post()
  @UseInterceptors(FilesInterceptor('files')) // key must match form-data key
  create(
    @Body() data: CreateTaskDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<Task> {
    return this.taskService.create(data, files);
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
  update(@Param('id') id: string, @Body() data: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(id, data);
  }
}
