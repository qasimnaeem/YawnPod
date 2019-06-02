import { SearchCriteriaBase } from "src/modules/shared/types/dto";


export interface PodItemStatusReportSearchCriteria extends SearchCriteriaBase {
    contextGroupId: string;
    podName: string;
    podGroupName: string;
    itemNumber?: number;
    itemName: string;
    itemStatus: string;
    user: string;
}

export interface PodEventHistorySearchCriteria extends SearchCriteriaBase {
    contextGroupId: string;
    podName: string;
    podGroupName: string;
    state: string;
    country: string;
    eventType: string;
    itemNumber?: number;
    itemName: string;
    from: string;
    to: string;
} 