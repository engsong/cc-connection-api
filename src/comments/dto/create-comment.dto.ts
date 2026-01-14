import { AuditorType, ModuleType } from '../comments.entity';

// create-comment.dto.ts
export class CreateCommentDto {
  comment: string;
  auditor_id: string;           // uuid
  auditor_type: AuditorType;
  module_id: string;            // <--- uuid
  module_type: ModuleType;
}



