import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { extname } from 'path';

@Controller('admins')
export class AdminsController {
  constructor(private readonly service: AdminsService) {}

  // ====================
  // Create Admin
  // ====================
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/admin',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(@Body() body: CreateAdminDto, @UploadedFile() file?: Express.Multer.File) {
    return this.service.create(body, file);
  }

  // ====================
  // Get all
  // ====================
  @Get()
  findAll() {
    return this.service.getAll();
  }

  // ====================
  // Get by ID
  // ====================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getById(id);
  }

  // ====================
  // Update Admin
  // ====================
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/admin',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() body: UpdateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.update(id, body, file);
  }

  // ====================
  // Delete Admin
  // ====================
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  // ====================
  // Find by Branch
  // ====================
  @Get('branch/:branchId')
  findByBranch(@Param('branchId') branchId: string) {
    return this.service.findByBranch(branchId);
  }

  @Post('by-branch')
  getByBranch(@Body() body: { branch_id: string }) {
    return this.service.findByBranch(body.branch_id);
  }
}
