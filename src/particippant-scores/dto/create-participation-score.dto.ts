export class CreateParticipationScoreDto {
  studentId: string;
  branchId: string;
  academicYearId: string;
  participationListId: string;
  date?: Date;
  score?: number;
  addedBy?: string;
}
