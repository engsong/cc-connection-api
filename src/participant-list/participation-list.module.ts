import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationList } from './participation-list.entity';
import { ParticipationListService } from './participation-list.service';
import { ParticipationListController } from './participation-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipationList])],
  providers: [ParticipationListService],
  controllers: [ParticipationListController],
})
export class ParticipationListModule {}
