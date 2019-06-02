import * as React from 'react';
import { GridColumn } from '@progress/kendo-react-grid';
import { SearchPage, SearchPageContainer } from '../../../shared/components/SearchPage';
import { localise } from '../../../shared/services';
import { SortDescriptor } from '@progress/kendo-data-query';
import { PermissionFilterBox } from './PermissionFilterBox';
import { PermissionSearchCriteria } from '../../types/dto';
import { DataGrid, DateTimeFormatCell } from '../../../shared/components/DataGrid';
import { RoleLookupTextCell } from '../RoleLookupTextCell/RoleLookupTextCell';

const gridName = "PermissionsGrid";
const apiController = "permissions";

class PermissionManagement extends SearchPage<PermissionSearchCriteria> {

    defaultSort: SortDescriptor = { field: "role", dir: `asc` };

    render() {
        return (
            <>
                <PermissionFilterBox history={this.props.history} onNewClick={this.goToAddNewPage} />

                <DataGrid name={gridName} history={this.props.history} onRowClick={this.goToDetailPage}>
                    <GridColumn field="role" title={localise("TEXT_ROLE")} cell={RoleLookupTextCell()} />
                    <GridColumn field="updatedOnUtc" title={localise("TEXT_LAST_UPDATE")} cell={DateTimeFormatCell()} />
                    <GridColumn field="updatedByName" title={localise("TEXT_LAST_UPDATED_BY")} />
                </DataGrid>
            </>
        )
    }
}

export default SearchPageContainer(PermissionManagement, gridName, apiController);