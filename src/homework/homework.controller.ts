import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto, UpdateHomeworkDto } from './dto/homework.dto';

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  // GET /homework
  @Get()
  findAll() {
    return this.homeworkService.getAllHomework();
  }

  // GET /homework/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.homeworkService.getHomeworkById(id);
  }

  // POST /homework
  @Post()
  create(@Body() dto: CreateHomeworkDto) {
    return this.homeworkService.createHomework(dto);
  }

  // PUT /homework/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.updateHomework(id, dto);
  }

  // DELETE /homework/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.homeworkService.deleteHomework(id);
  }
}
