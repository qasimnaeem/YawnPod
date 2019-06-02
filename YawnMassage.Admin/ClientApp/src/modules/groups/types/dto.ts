import { SearchCriteriaBase, MobileNumber } from "../../shared/types/dto";

export interface GroupSearchCriteria extends SearchCriteriaBase {
    name: string;
}

export interface Group {
    id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    mobileNumber?: MobileNumber;
    email?: string;
    isDeleted?: boolean;
    updatedByName?: string;
    updatedOnUtc?: Date;
    eTag?: string;
}