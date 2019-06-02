export interface FilterColumn {
    field: string;
    titleKey: string;
    width?: string;
    cell?: any;
}

export interface FilterField {
    filterProp: string;
    labelKey: string;
    remarkKey?: string;
    dropdownKey?: string;
    allowAll?: boolean;
    allText?: string;
}