export interface AppRouteInfo {
    path?: string,
    name?: string,
    icon?: string,
    component?: any,
    redirect?: boolean,
    pathTo?: string,
    collapse?: boolean,
    children?: AppRouteInfo[];
    parent?: AppRouteInfo;
    level?: number;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    culture: string;
    timeZone: string;
    email: string;
}

export interface AuthResultDto {
    isSucceeded: boolean;
    errorCode: string;
    permissions: string[];
    user: User;
}

export interface OperationResult {
    isSuccess: boolean;
    message: string;
}

export interface RequestInfoDto {
    requestPending: boolean,
    spinnerVisible: boolean
}

export interface SetPasswordDto {
    userId: string;
    password: string;
    confirmPassword: string;
    passwordResetToken: string;
}

export interface SetPasswordResult {
    email: string;
    operationResult: OperationResult;
    passwordResetToken: string
}