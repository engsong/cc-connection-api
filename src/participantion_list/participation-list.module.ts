import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationListService } from './participation-list.service';
import { ParticipationListController } from './participation-list.controller';
import { ParticipationList } from './participation-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipationList])],
  providers: [ParticipationListService],
  controllers: [ParticipationListController],
})
export class ParticipationListModule {}
