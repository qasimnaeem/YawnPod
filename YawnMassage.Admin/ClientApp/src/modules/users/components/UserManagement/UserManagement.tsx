import * as React from "react";
import { GridColumn } from "@progress/kendo-react-grid";
import { UserSearchCriteria } from "../../types/dto";
import { UserFilterBox } from "./UserFilterBox";
import { SearchPage, SearchPageContainer } from "../../../shared/components/SearchPage";
import { localise } from "../../../shared/services";
import { SortDescriptor } from '@progress/kendo-data-query';
import { DataGrid, DateTimeFormatCell } from "../../../shared/components/DataGrid";
import { UserGroupRolesCell } from "../UserManagement/UserGroupRolesCell";

const gridName = "UserGrid";
const apiController = "user";

class UserManagement extends SearchPage<UserSearchCriteria> {

    routePath: string = "/users/usermanagement";
    defaultSort: SortDescriptor = { field: "fullName", dir: "asc" };      

    render() {
        return (
            <>
                <UserFilterBox history={this.props.history} onNewClick={this.goToAddNewPage} />

                <DataGrid history={this.props.history} name={gridName} onRowClick={this.goToDetailPage}>
                    <GridColumn field="fullName" title={localise("TEXT_NAME")} />
                    <GridColumn field="groupRoleList" sortable={false} title={localise("TEXT_ROLES")} cell={UserGroupRolesCell()} />
                    <GridColumn field="updatedOnUtc" title={localise("TEXT_LAST_UPDATE")} cell={DateTimeFormatCell()} />
                    <GridColumn field="updatedByName" title={localise("TEXT_LAST_UPDATED_BY")} />
                </DataGrid>
            </>
        );
    }
}

export default SearchPageContainer(UserManagement, gridName, apiController);