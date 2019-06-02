import { SearchCriteriaBase } from "../../shared/types/dto";

export interface PermissionConfig {
    id: string;
    groupId?: string;
    role?: string;
    permissions?: string[];
    isDeleted?: boolean;
    updatedByName?: string;
    updatedOnUtc?: Date;
    etag?: string;
}

export interface PermissionGridItem {
    value?: string;
    remark?: string;
}

export interface PermissionSearchCriteria extends SearchCriteriaBase {
    contextGroupId: string;
    role: string;
}