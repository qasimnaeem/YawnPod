import * as React from "react";
import { GridColumn } from "@progress/kendo-react-grid";
import { DataGrid, DateTimeFormatCell, LookupTextCell } from "src/modules/shared/components/DataGrid";
import { localise } from "src/modules/shared/services";
import { BulkDataManagementSearchCriteria } from "../../types/dto";
import { SearchPage, SearchPageContainer } from "src/modules/shared/components/SearchPage";
import { SortDescriptor } from "@progress/kendo-data-query";
import { BulkDataFilterBox } from "./BulkDataFilterBox";
import "./bulk-data-management.css";
import { BulkDataActionButtonsCell } from "./BulkDataActionButtonsCell";

const gridName = "BulkDataGrid";
const apiController = "bulkData";

class BulkDataManagement extends SearchPage<BulkDataManagementSearchCriteria>
{
    routePath: string = "/bulkData/bulkdatamanagement";
    defaultSort: SortDescriptor = { field: "createdOnUtc", dir: "desc" };
    timerReference: any;    

    render() {
        return (
            <>
                <BulkDataFilterBox history={this.props.history} hideIncludeDeleteOption={true} />
                <DataGrid history={this.props.history} name={gridName}>
                    <GridColumn field="fileName" title={localise("TEXT_FILE_NAME")} />
                    <GridColumn field="operationStatusCode" title={localise("TEXT_FILE_STATUS")} cell={LookupTextCell('LIST_BULKDATA_OPERATION_STATUSES')} />
                    <GridColumn field="operationTypeCode" title={localise("TEXT_BULK_DATA_ACTION")} cell={LookupTextCell('LIST_BULKDATA_OPERATION_TYPES')} />
                    <GridColumn field="createdOnUtc" title={localise("TEXT_CREATED_ON")} cell={DateTimeFormatCell()} />
                    <GridColumn width="55" cell={BulkDataActionButtonsCell()} />
                </DataGrid>
            </>)
    }    
}

export default SearchPageContainer(BulkDataManagement, gridName, apiController);