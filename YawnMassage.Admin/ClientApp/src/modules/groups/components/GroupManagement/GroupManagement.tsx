import * as React from "react";
import { GridColumn } from "@progress/kendo-react-grid";
import { GroupSearchCriteria } from "../../types/dto";
import { GroupFilterBox } from "./GroupFilterBox";
import { SearchPage, SearchPageContainer } from "../../../shared/components/SearchPage";
import { localise } from "../../../shared/services";
import { SortDescriptor } from '@progress/kendo-data-query';
import { DataGrid, DateTimeFormatCell } from "../../../shared/components/DataGrid";
import { PhoneNumberCell } from "../../../shared/components/DataGrid/Cells/PhoneNumberCell";

const gridName = "GroupGrid";
const apiController = "group";

class GroupManagement extends SearchPage<GroupSearchCriteria> {

    routePath: string = "/groups/groupmanagement";
    defaultSort: SortDescriptor = { field: "name", dir: "asc" };      

    render() {
        return (
            <>
                <GroupFilterBox history={this.props.history} onNewClick={this.goToAddNewPage} />

                <DataGrid history={this.props.history} name={gridName} onRowClick={this.goToDetailPage}>
                    <GridColumn field="name" title={localise("TEXT_GROUP")} />
                    <GridColumn field="fullName" title={localise("TEXT_PRIMARYCONTACT")} />
                    <GridColumn field="email" title={localise("TEXT_EMAIL")} />
                    <GridColumn field="mobileNumber" sortable={false} title={localise("TEXT_PHONE")} cell={PhoneNumberCell()} />
                    <GridColumn field="updatedOnUtc" title={localise("TEXT_LAST_UPDATE")} cell={DateTimeFormatCell()} />
                    <GridColumn field="updatedByName" title={localise("TEXT_LAST_UPDATED_BY")} />
                </DataGrid>
            </>
        );
    }
}

export default SearchPageContainer(GroupManagement, gridName, apiController);