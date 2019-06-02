export interface AppRouteInfo {
    path: string;
    redirectTo?: string;
    icon?: string;
    section?: string;
    component?: any;
    layout?: string;// Used a string instead of a Component due to avoid circular depencies.
                    //  Eg. Component might need router service but on the other hand the router service needs the same component
    isPublic?: boolean;
    children?: AppRouteInfo[];
    parent?: AppRouteInfo;
    titleKey?: string;
    canAccess?: boolean;
}