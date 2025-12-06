import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearLevel } from './year-level.entity';
import { YearLevelController } from './year-level.controller';
import { YearLevelService } from './year-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([YearLevel])],
  controllers: [YearLevelController],
  providers: [YearLevelService],
})
export class YearLevelModule {}
