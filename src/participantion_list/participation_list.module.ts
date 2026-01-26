import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationListService } from './participation_list.service';
import { ParticipationListController } from './participation_list.controller';
import { ParticipationList } from './participation_list.entity';
import { ClassesModule } from '../classes/classes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipationList]),
    ClassesModule,                    // ← must have this import
  ],
  providers: [ParticipationListService],
  controllers: [ParticipationListController], // if exists
})
export class ParticipationListModule {}
