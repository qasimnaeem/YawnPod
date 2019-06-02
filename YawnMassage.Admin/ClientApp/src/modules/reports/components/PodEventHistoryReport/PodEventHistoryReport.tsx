import * as React from 'react';
import { SearchPage, SearchPageContainer } from 'src/modules/shared/components/SearchPage';
import { DataGrid, LookupTextCell, DateTimeFormatCell } from 'src/modules/shared/components/DataGrid';
import { GridColumn } from '@progress/kendo-react-grid';
import { localise } from 'src/modules/shared/services';
import { SortDescriptor } from '@progress/kendo-data-query';
import { PodItemStatusReportSearchCriteria } from '../../types/dto';
import { PodEventHistoryReportFilterBox } from './PodEventHistoryReportFilterBox';


const gridName = "PodEventHistoryReportGrid";
const apiController = "report";
const actionMethod = "PodEventsReport";

class PodEventHistoryReport extends SearchPage<PodItemStatusReportSearchCriteria>{
    routePath: string = "/reports/overview/pod_event_history_report";
    defaultSort: SortDescriptor = { field: "timestamp", dir: "desc" };

    render() {
        return (
            <>
                <PodEventHistoryReportFilterBox history={this.props.history} hideIncludeDeleteOption={true}
                    recordsExist={this.props.recordsExist} searchPermission={"POD_REPORTS_VIEW"} />

                <DataGrid history={this.props.history} name={gridName}>
                    <GridColumn field="podName" title={localise("TEXT_POD_NAME")} />
                    <GridColumn field="podGroupName" title={localise("TEXT_PODGROUP_NAME")} />
                    <GridColumn field="country" title={localise("TEXT_COUNTRY")} />
                    <GridColumn field="state" title={localise("TEXT_STATE")} />
                    <GridColumn field="eventType" title={localise("TEXT_EVENT")} cell={LookupTextCell('LIST_POD_EVENT_TYPES')} />
                    <GridColumn field="itemNumber" title={localise("TEXT_ITEM_NUMBER")} />
                    <GridColumn field="itemName" title={localise("TEXT_ITEM_NAME")} />
                    <GridColumn field="timestamp" title={localise("TEXT_DATE_TIME")} cell={DateTimeFormatCell("dd-MMM-yyyy HH:mm:ss")} />
                </DataGrid>
            </>
        )
    }
}

export default SearchPageContainer(PodEventHistoryReport, gridName, apiController, actionMethod, true);