import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teaching } from './teaching.entity';
import { TeachingService } from './teaching.service';
import { TeachingController } from './teaching.controller';
import { Branch } from '../branch/branch.entity';
import { Admin } from '../admin/admin.entity';
import { Class } from '../classes/class.entity';
import { Subject } from '../subjects/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Teaching,
      Branch,
      Admin,
      Class,
      Subject,
    ]),
  ],
  controllers: [TeachingController],
  providers: [TeachingService],
})
export class TeachingModule {}
