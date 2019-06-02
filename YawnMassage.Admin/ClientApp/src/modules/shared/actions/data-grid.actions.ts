import { Dispatch } from "redux";
import { SortDescriptor } from "@progress/kendo-data-query";
import { store } from "src/redux/store";
import * as constants from "../constants/data-grid.constants";
import { PagedResultSet } from "../types/dto";
import { DataGridState } from "../types/store";
import { apiService, groupService, contextService } from "../services";

const DEFAULT_PAGE_SIZE = 10;

export const dataGridActions = {
    loadData,
    loadMoreData,
    changeSelection,
    bulkDelete,
    clearData,
    refreshGrid
}

export interface LoadDataSuccessAction {
    type: constants.DATAGRID_LOAD_DATA_SUCCESS;
    gridName: string;
    dataItems: any[];
    continuationToken?: string;
    filter?: {};
    sort: SortDescriptor;
    apiController: string;
}

export interface LoadMoreSuccessAction {
    type: constants.DATAGRID_LOAD_MORE_SUCCESS;
    gridName: string;
    dataItems: any[];
    continuationToken?: string;
}

export interface ChangeSelectionAction {
    type: constants.DATAGRID_CHANGE_SELECTION;
    gridName: string;
    ids: string[];
    selected: boolean;
}

export interface ClearDataAction {
    type: constants.DATAGRID_CLEAR_DATA;
    gridName: string;
}

export type DataGridAction = LoadDataSuccessAction | LoadMoreSuccessAction | ChangeSelectionAction | ClearDataAction;

function loadData(gridName: string, apiController: string, sort: SortDescriptor, filter?: {},
    actionMethod?: string, disableRecordLimit?: boolean) {
    return (dispatch: Dispatch<any>) => {
        return loadGridData(sort, dispatch, gridName, filter, apiController, actionMethod, disableRecordLimit);
    }
}

function refreshGrid(gridName: string) {
    var state: DataGridState = getGridState(gridName);

    return (dispatch: Dispatch<any>) => {
        if (state != undefined)
            return loadGridData(state.sort, dispatch, gridName, state.filter, state.apiController);
        else
            return Promise.resolve();

    }

}

function loadMoreData(gridName: string) {
    const state = getGridState(gridName);
    if (!state || !state.sort || !state.apiController)
        throw `You must load data with filter before loading more data (datagrid:'${gridName}').`;
    else if (!state.continuationToken)
        throw `No more data to load (datagrid:'${gridName}')`;

    return (dispatch: Dispatch<any>) => {
        let query = { sortBy: state.sort.field, sortDir: state.sort.dir, limit: DEFAULT_PAGE_SIZE, pageToken: state.continuationToken, ...state.filter };

        return apiService.get<PagedResultSet<any>>(state.apiController, undefined, undefined, query)
            .then((resultSet: PagedResultSet<any>) => {

                resultSet.results.forEach(item => item.rowSelected = false);
                dispatch({
                    type: constants.DATAGRID_LOAD_MORE_SUCCESS,
                    gridName: gridName,
                    dataItems: resultSet.results,
                    continuationToken: resultSet.continuationToken
                });
            })
    }
}

function loadGridData(sort: SortDescriptor, dispatch: any, gridName: string, filter: any, apiController: string,
    actionMethod?: string, disableRecordLimit?: boolean) {
    let query = { sortBy: sort.field, sortDir: sort.dir, limit: disableRecordLimit ? undefined : DEFAULT_PAGE_SIZE, ...filter };

    return apiService.get<PagedResultSet<any>>(apiController, actionMethod, undefined, query)
        .then((resultSet: PagedResultSet<any>) => {
            resultSet.results.forEach(item => item.rowSelected = false);
            dispatch({
                type: constants.DATAGRID_LOAD_DATA_SUCCESS,
                gridName: gridName,
                dataItems: resultSet.results,
                continuationToken: resultSet.continuationToken,
                filter: filter,
                sort: sort,
                apiController: apiController
            });
        })
}

function changeSelection(gridName: string, ids: string[], selected: boolean): ChangeSelectionAction {
    return { type: constants.DATAGRID_CHANGE_SELECTION, gridName: gridName, ids: ids, selected: selected };
}

function bulkDelete(gridName: string) {
    const state = getGridState(gridName);
    if (!state || !state.sort || !state.apiController)
        throw `You must load data with filter before bulk delete (datagrid:'${gridName}').`;

    let ids = state.dataItems.filter(item => item.rowSelected).map(item => item.id);

    if (ids.length > 0) {

    }

    return (dispatch: Dispatch<any>) => {
        apiService.deleteMultiple(state.apiController, undefined, ids)
            .then(() => {
                //Refresh data.
                dispatch(loadData(gridName, state.apiController, state.sort, state.filter));
                afterBulkDelete(gridName, ids);
            })
    };
}

function clearData(gridName: string) {
    return { type: constants.DATAGRID_CLEAR_DATA, gridName: gridName };
}

function getGridState(gridName: string): DataGridState {
    return (store.getState() as any).dataGrid[gridName];
}

function afterBulkDelete(gridName: string, ids: any[]) {
    switch (gridName) {
        case "GroupGrid":
            let groups = groupService.getGroupList();

            ids.forEach((id) => {
                let item = groups.find(c => c.id == id);

                if (item)
                    groups.splice(groups.indexOf(item), 1);
            });

            groupService.setGroupList(groups);
            contextService.setSingleGroupId(
                (groups.length == 1) ? groups[0].id : undefined);
            break;
    }
}