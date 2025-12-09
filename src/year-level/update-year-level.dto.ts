import { PartialType } from '@nestjs/mapped-types';
import { CreateYearLevelDto } from './create-year-level.dto';

export class UpdateYearLevelDto extends PartialType(CreateYearLevelDto) {}
