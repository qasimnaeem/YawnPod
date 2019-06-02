import * as React from "react";
import { SearchFilterBox, SearchFilterBoxProps, SearchFilterField } from "../../../shared/components/SearchFilterBox";
import { BulkDataManagementSearchCriteria, BulkDataOperationType } from "../../types/dto";
import { Col, Row } from "reactstrap";
import GroupList from "../../../shared/components/GroupList/GroupList";
import { contextService, apiService, permissionService } from "../../../shared/services";
import { ActionButton } from "src/modules/shared/components/ActionButtons/ActionButtons";
import { store } from "src/redux/store";
import { dataGridActions } from "src/modules/shared/actions/data-grid.actions";
import * as qs from "query-string";
import { ImportPopup } from "../BulkDataImport/ImportPopup/ImportPopup";

export class BulkDataFilterBox extends SearchFilterBox<BulkDataManagementSearchCriteria>{
    constructor(props: SearchFilterBoxProps) {

        const initialState = {
            contextGroupId: contextService.getDefaultSingleGroupId(true),
        }

        super(props, initialState);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.exportClick = this.exportClick.bind(this);
    }

    getFields(): JSX.Element {
        const { contextGroupId: contextGroupId } = this.state;

        return <> <Row>
            <Col md={6} lg={3}>
                <SearchFilterField titleKey="TEXT_GROUP">
                    <GroupList hideAllOption={false} allowAny={true} permissionSuffix="SEARCH" name="contextGroupId"
                        value={contextGroupId} onChange={this.handleGroupChange} />
                </SearchFilterField>
            </Col>
        </Row>
        </>
    }

    exportClick() {
        //This is to set groupID by force and export by that group. (To fix the issue of not setting the UI dropdown selected group)
        const criteria = qs.parse(this.props.history.location.search);
        this.props.history.push({
            pathname: "",
            search: qs.stringify(Object.assign(criteria, this.state))
        });

        apiService.post('bulkData', undefined, { operationTypeCode: BulkDataOperationType.Export, groupId: this.state.contextGroupId }).then(() => {
            store.dispatch<any>(dataGridActions.refreshGrid('BulkDataGrid'));
        });
    }

    getButtons(): JSX.Element[] {
        var groupId = this.state.contextGroupId;
        let canPerformBulkDataOperation = permissionService.isActionPermittedForGroup("SEARCH",groupId);

        let elements = []
        const isValid = this.validateCriteria(this.state);
        if (canPerformBulkDataOperation || groupId == 'any') {
            elements.push(<ActionButton className="float-right" key="exportbtn" textKey="TEXT_EXPORT" color="secondary"
                icon="fa-download" onClick={this.exportClick} disabled={!isValid} />);
            elements.push(<ImportPopup history={this.props.history} parentPageGroupId={groupId}
                key={groupId} />);
        }
        return elements;
    }

    validateCriteria(criteria: BulkDataManagementSearchCriteria): boolean {
        return criteria.contextGroupId.length > 0
    }

    handleGroupChange(event: any) {
        let e = {
            target: {
                value: event.target.value,
                name: event.target.name
            }
        }
        this.setState({ ...this.state, contextGroupId: event.target.value }, () => super.handleChange(e));
    }
}
