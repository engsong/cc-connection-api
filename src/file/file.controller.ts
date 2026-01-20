import { Controller, Get, Post, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { join } from 'path';
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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const module = req.body.module as 'event' | 'event_activity' | 'task';
          const uploadDir = join(process.cwd(), 'uploads', module ?? 'task');
          fs.mkdirSync(uploadDir, { recursive: true });
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
          cb(null, `${timestamp}_${safeName}`);
        },
      }),
    }),
  )
  async upload(
    @UploadedFile() fileData: Express.Multer.File,
    @Body() body: { module: 'event' | 'event_activity' | 'task'; ownerId: string },
  ): Promise<File> {
    const { module, ownerId } = body;
    const relativePath = join(module, fileData.filename).replace(/\\/g, '/');
    const payload: Partial<File> = {
      module,
      file_path: relativePath,
      is_active: true,
      is_deleted: false,
    };
    if (module === 'event') payload.event_id = ownerId;
    else if (module === 'event_activity') payload.event_activity_id = ownerId;
    else payload.task_id = ownerId;
    return this.fileService.create(payload);
  }

  @Get('by/:module/:ownerId')
  findByModule(
    @Param('module') module: 'event' | 'event_activity' | 'task',
    @Param('ownerId') ownerId: string,
  ): Promise<File[]> {
    return this.fileService.findByModuleAndOwner(module, ownerId);
  }
}
