export class UpdateSavingDto {
  branchId?: string;
  academicYearId?: string;
  studentId?: string;
  classId?: string;

  type?: string;
  transactionType?: string;
  status?: string;
  openingBalance?: number;
  amount?: number;
  closingBalance?: number;
  lockTime?: Date;
  completeTime?: Date;
  cancelTime?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
}
