import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FileService } from './file.service';
import { File } from './files.entity';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() body: Partial<File>): Promise<File> {
    return this.fileService.create(body);
  }

  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<File> {
    return this.fileService.findOne(id);
  }
}
