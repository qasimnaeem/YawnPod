import { SortDescriptor } from "@progress/kendo-data-query";

export interface GlobalSpinnerState {
    pendingRequestCount: number
}

export interface Alert {
    alertType?: string;
    message?: string;
}

export interface ConfirmDialogState {
    visible?: boolean,
    message?: string,
    title?: string
}

export interface NotificationDialogState {
    visible?: boolean,
    message?: string,
    title?: string
}


export interface DataGridState {
    dataItems: any[];
    sort: SortDescriptor;
    filter?: any;
    apiController: string;
    continuationToken?: string;
}

export interface DetailPageState {
    item?: DetailObject;
}

export type DetailObject = {
    id: string;
    isDeleted?: boolean;
    groupId?: string;
    updatedByName?: string;
    updatedOnUtc?: Date;
    eTag?: string;
}