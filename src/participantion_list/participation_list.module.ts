import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationListService } from './participation_list.service';
import { ParticipationListController } from './participation_list.controller';
import { ParticipationList } from './participation_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipationList])],
  providers: [ParticipationListService],
  controllers: [ParticipationListController],
})
export class ParticipationListModule {}
