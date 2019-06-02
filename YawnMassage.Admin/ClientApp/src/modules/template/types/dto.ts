import { SearchCriteriaBase } from "../../shared/types/dto";

export interface TemplateSearchCriteria extends SearchCriteriaBase {
  contextGroupId: string;
  culture: string;
  section: string;
  key: string;
  channel: string;
}

export interface Template {
  id: string;
  groupId?: string;
  culture?: string;
  section?: string;
  channel?: string;
  subject?: string;
  senderId?: string;
  content?: string;
  remark?: string;
  priority?: number;
  key?: string;
  value?: string;
  isDeleted?: boolean;
  updatedByID?: string;
  updatedByName?: string;
  updatedOnUtc?: Date;
  eTag?: string;
  templates: TemplateArray[];
}

export interface TemplateArray {
  refID?: string;
  name?: string;
  type?: string;
  channel?: string;
}

export enum TemplateChannels {
  Email = "EMAIL",
  SMS = "SMS"
}
