import * as React from "react";
import { GridColumn } from "@progress/kendo-react-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
import { PodSearchCriteria } from "../../types/dto";
import { SearchPage, SearchPageContainer } from "../../../shared/components/SearchPage";
import { PodFilterBox } from "./PodFilterBox";
import { DataGrid, DateTimeFormatCell, LookupTextCell, CountryLocationCell } from "../../../shared/components/DataGrid";
import { localise } from "../../../shared/services";


const gridName = "PodGrid";
const apiController = "pod";

class PodManagement extends SearchPage<PodSearchCriteria>{
    routePath: string = "/pods/podmanagement";
    defaultSort: SortDescriptor = { field: "name", dir: "asc" };

    render() {
        return (
            <>
                <PodFilterBox history={this.props.history} onNewClick={this.goToAddNewPage} />
                
                <DataGrid history={this.props.history} name={gridName} onRowClick={this.goToDetailPage}>
                    <GridColumn field="name" title={localise("TEXT_POD_NAME")} />
                    <GridColumn field="country" title={localise("TEXT_COUNTRY")} cell={CountryLocationCell()} />
                    <GridColumn field="state" title={localise("TEXT_STATE")} cell={CountryLocationCell()} />
                    <GridColumn field="area" title={localise("TEXT_AREA")} cell={LookupTextCell("LIST_AREAS")} />
                    <GridColumn field="updatedOnUtc" title={localise("TEXT_LAST_UPDATE")} cell={DateTimeFormatCell()} />
                    <GridColumn field="updatedByName" title={localise("TEXT_LAST_UPDATED_BY")} />
                </DataGrid>
            </>
        )
    }
}

export default SearchPageContainer(PodManagement, gridName, apiController);