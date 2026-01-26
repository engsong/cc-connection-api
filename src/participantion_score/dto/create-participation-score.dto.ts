export interface ParticipationScoreItemDto {
  id: string;             // optional, frontend tracking ID
  participationId: string; // the ID of the participation/activity
  studentId: string;       // the student ID
  name: string;           // activity/participation name
  score: number;
  date?: string;          // optional
  addedBy?: string;       // optional
}

export class CreateParticipationScoreDto {
  branchId: string;
  academicYearId: string;
  classId: string;
  addedBy: string;
  date?: string;
  scores: ParticipationScoreItemDto[];
}