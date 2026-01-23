export class CreateParticipationScoreDto {
  branchId: string;
  academicYearId: number;
  addedBy: string;
  scores: ParticipationScoreItemDto[];
}

export class ParticipationScoreItemDto {
  id: string; // จาก participant list
  name: string;
  score: number;
}
