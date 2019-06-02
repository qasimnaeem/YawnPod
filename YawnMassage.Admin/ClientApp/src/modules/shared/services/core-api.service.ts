import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { alertActions } from "../actions/alert.actions";
import { spinnerActions } from "../actions/spinner.actions";
import { store } from "src/redux/store"
import { RequestInfo } from "../types/dto";
import { confirmDialogService, contextService, accountSessionService } from ".";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = false;
axios.defaults.baseURL = appConfig.apiUrl;

export const coreApiService = {
    get,
    post,
    put,
    delete: deleteRecord,
    deleteMultiple
};

function get<T>(controller: string, action: string = '', urlParams: string[] = [],
    queryParams: any = null, ignoreDisplayErrorCode: any = undefined) {
    return makeHttpRequest<T>("get", controller, action, urlParams, queryParams, ignoreDisplayErrorCode);
}

function post<T>(controller: string, action: string = '', data: any = null, urlParams: string[] = []) {
    return makeHttpRequest<T>("post", controller, action, urlParams, undefined, data);
}

function put<T>(controller: string, action: string = '', data: any = null) {
    return makeHttpRequest<T>("put", controller, action, undefined, undefined, data);
}

function deleteRecord(controller: string, action: string = '', id: string) {
    return makeHttpRequest("delete", controller, action, [id]);
}

function deleteMultiple(controller: string, action: string = '', ids: string[]) {
    return makeHttpRequest("delete", controller, action, undefined, { ids: ids });
}

function getContextHeaders(): any {

    const uiContext = contextService.getCurrentContext();

    return {
        "X-GroupId": uiContext.groupId,
        "X-Culture": uiContext.culture
    }
}

function makeHttpRequest<T>(
    httpMethod: string,
    controller: string,
    action: string = '',
    urlParams: string[] | undefined = undefined,
    queryParams: any = null,
    data: any = null,
    ignoreDisplayErrorCode: any = undefined) {

    var busyRequestInfo = getBusyRequestInfo();
    beginBusyRequest(busyRequestInfo);

    let requestConfig: AxiosRequestConfig = {
        method: httpMethod,
        url: createUrl(controller, action, urlParams),
        params: queryParams,
        headers: getContextHeaders(),
        data: data
    };

    let promise = axios.request(requestConfig)
        .then((response: AxiosResponse<T>) => {
            endBusyRequest(busyRequestInfo);
            return response;
        });

    promise.catch((err: any) => {
        handleError(err.response, busyRequestInfo, ignoreDisplayErrorCode);
    });

    return promise;
}

function handleError(response: AxiosResponse, busyRequestInfo: RequestInfo, ignoreDisplayErrorCode: any = undefined) {
    endBusyRequest(busyRequestInfo);

    var errorKey = '';

    if (response) {
        console.error(response.data);
        if (response.status == 401) {
            accountSessionService.clearSession();
            window.location.href = "/#/account/login";
            errorKey = "ERROR_UNAUTHORIZED_ACCESS";
        }
        if (response.status == 403) {
            errorKey = "ERROR_FORBIDDEN_ACCESS";
        }
        else if (response.status == 409) {
            confirmDialogService.showDialog("CONFIRMATION_CONCURRENCY",
                () => { window.location.reload() });
        }
        else {
            errorKey = response.data;
        }
    }
    else {
        errorKey = "ERROR_UNKNOWN";
    }

    if (errorKey.length > 0 && !(ignoreDisplayErrorCode || ignoreDisplayErrorCode == 'ERROR_RECORD_ALREADY_DELETED'))
        alertActions.showError(errorKey);

    return errorKey;
}

function createUrl(controler: string, action: string, urlParams?: string[]): string {
    let url = controler + (action != '' ? '/' + action : '');

    if (urlParams != null) {
        url += '/' + urlParams.join("/");
    }

    return url;
}

function beginBusyRequest(requestInfo: RequestInfo) {
    setTimeout(() => {
        if (requestInfo.requestPending) {
            store.dispatch(spinnerActions.showSpinner());
            requestInfo.spinnerVisible = true;
        }
    }, 500);
}

function endBusyRequest(requestInfo: RequestInfo) {
    requestInfo.requestPending = false;
    if (requestInfo.spinnerVisible) {
        store.dispatch(spinnerActions.hideSpinner());
    }
}

function getBusyRequestInfo(): RequestInfo {
    return {
        requestPending: true,
        spinnerVisible: false
    };
}
