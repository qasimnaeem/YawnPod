import * as React from "react";
import { PermissionSearchCriteria } from "../../types/dto";
import GroupList from "../../../shared/components/GroupList/GroupList";
import { SearchFilterBox, SearchFilterBoxProps, SearchFilterField } from "../../../shared/components/SearchFilterBox";
import { Row, Col } from "reactstrap";
import { contextService } from "../../../shared/services";
import { RoleDropDown } from "../RoleDropDown/RoleDropDown";

export class PermissionFilterBox extends SearchFilterBox<PermissionSearchCriteria> {

    constructor(props: SearchFilterBoxProps) {

        const initialState = {
            contextGroupId: contextService.getDefaultSingleGroupId(),
            role: 'any'
        }

        super(props, initialState);
        this.handleGroupChange = this.handleGroupChange.bind(this);
    }

    getFields(): JSX.Element {
        const { contextGroupId, role } = this.state;
        return <Row>
            <Col md={6} lg={3}>
                <SearchFilterField titleKey="TEXT_GROUP">
                    <GroupList permissionSuffix="SEARCH" name="contextGroupId" value={contextGroupId} onChange={this.handleGroupChange} />
                </SearchFilterField>
            </Col>
            <Col md={6} lg={3}>
                <SearchFilterField titleKey="TEXT_ROLE">
                    <RoleDropDown name="role" groupId={contextGroupId} allowAny={true}
                        textAny="TEXT_ANY_ROLE" value={role} onChange={this.handleChange} />
                </SearchFilterField>
            </Col>
        </Row>
    }

    validateCriteria(criteria: PermissionSearchCriteria): boolean {
        return criteria.contextGroupId.length > 0 && criteria.role.length > 0;
    }

    handleGroupChange(event: any) {
        let e = {
            target: {
                value: event.target.value,
                name: event.target.name
            }
        }
        this.setState({ ...this.state, role: 'any' }, () => super.handleChange(e));
    }
}