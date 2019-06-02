import { SearchCriteriaBase, MobileNumber } from "../../shared/types/dto";

export interface UserSearchCriteria extends SearchCriteriaBase {
    name: string;
    contextGroupId: string;
    role: string;
}

export interface User {
    id: string;
    culture?: string;
    timeZone?: string;
    firstName?: string;
    lastName?: string;
    mobileNumber?: MobileNumber;
    email?: string;
    isEmailConfirmed?:boolean;
    isActivationEmailSent?:boolean;
    alternateId?: string;
    accessExpiryDate?: Date;
    isDeleted?: boolean;
    updatedByName?: string;
    updatedOnUtc?: Date;
    eTag?: string;
    pin?:number;
    groupRoles?: UserGroupRole[];
}

export interface UserGroupRole {
    refId?: string;
    groupId?: string;
    role?: string;
}
