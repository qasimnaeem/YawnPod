export interface DataUpdateResult {
    id: string;
    eTag: string;
    updatedByName: string;
    updatedOnUtc: Date;
}

export interface RequestInfo {
    requestPending: boolean,
    spinnerVisible: boolean
}

export interface PagedResultSet<T> {
    results: T[];
    continuationToken?: string;
}

export interface ListItem {
    id: string;
    name: string;
}

export interface LocalisationText {
    key: string;
    groupId: string;
    culture: string;
    section: string;
    priority: number;
    value: string;
}

export interface Lookup {
    key: string;
    groupId: string;
    culture: string;
    section: string;
    priority: number;
    items: LookupItem[];
}

export interface LookupItem {
    text?: string;
    value?: string;
    remark?: string;
    childLookupKey?: string;
    sortOrder?: number;
}

export interface Country {
    value: string;
    text: string;
    children: CountryState[];
}

export interface CountryState {
    value: string;
    text: string;
}

export interface Configuration {
    key: string;
    groupId: string;
    culture: string;
    section: string;
    priority: number;
    value: string;
}

export interface SearchCriteriaBase {
    includeDeleted?: boolean;
    hideIncludeDeleteOption?:boolean;
}

export interface UiContext {
    groupId: string;
    section: string;
    culture: string;
}

export interface MobileNumber {
    iddCode?: string;
    number?: string;
}

export interface PodConfiguration {
    index: number;
    key: string;
    value: string;
    error?: string;
    inheritedValue?: string;
}


