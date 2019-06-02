import { History } from "history";
import * as qs from "query-string";

export const navService = {
    goToDetailPage,
    goBackToListPage
}

function goToDetailPage(path: string, groupId: string | undefined, history: History) {

    let params = {} as any;

    if (groupId)
        params.contextGroupId = groupId;

    if (history.location.search)
        params.listQuery = encodeURI(history.location.search);

    const queryString = qs.stringify(params);

    history.push({
        pathname: path,
        search: queryString
    });
}

function goBackToListPage(path: string, history: History) {
    history.push({
        pathname: path,
        search: decodeURI(qs.parse(history.location.search).listQuery || "")
    });
}