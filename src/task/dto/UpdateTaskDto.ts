import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './CreateTaskDto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
