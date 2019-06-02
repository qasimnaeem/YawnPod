import { SearchCriteriaBase, LookupItem } from "../../shared/types/dto";

export interface ConfigurationSearchCriteria extends SearchCriteriaBase {
    contextGroupId: string;
    culture: string;
    section: string;
    key: string;
}

export interface Lookup {
    id: string;
    groupId?: string;
    culture?: string;
    section?: string;
    priority?: number;
    key?: string;
    includeInPod?: boolean;
    isDeleted?: boolean;
    updatedByName?: string;
    updatedOnUtc?: Date;
    items?: LookupItem[];
    eTag?: string;
}

export interface Localisation {
    id: string;
    groupId?: string;
    culture?: string;
    section?: string;
    priority?: number;
    key?: string;
    remark?: string;
    includeInPod?: boolean;
    value?: string;
    isDeleted?: boolean;
    updatedByName?: string;
    updatedOnUtc?: Date;
    eTag?: string;
}

export interface Configuration {
    id: string;
    groupId?: string;
    culture?: string;
    section?: string;
    priority?: number;
    key?: string;
    remark?: string;
    includeInPod?: boolean;
    value?: string;
    isDeleted?: boolean;
    updatedByName?: string;
    updatedOnUtc?: Date;
    eTag?: string;
}
