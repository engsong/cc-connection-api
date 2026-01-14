import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from './examination.entity';
import { ExaminationService } from './examination.service';
import { ExaminationController } from './examination.controller';
import { Branch } from '../branch/branch.entity';
import { Student } from '../students/student.entity';
import { Subject } from '../subjects/subject.entity';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Examination,
      Branch,
      Student,
      Subject,
      Admin,
    ]),
  ],
  controllers: [ExaminationController],
  providers: [ExaminationService],
})
export class ExaminationModule {}
