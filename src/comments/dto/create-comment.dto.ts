export class CreateCommentDto {
  comment: string;
  auditor_id: string;
  auditor_type: number;
  module_id?: string;
}
