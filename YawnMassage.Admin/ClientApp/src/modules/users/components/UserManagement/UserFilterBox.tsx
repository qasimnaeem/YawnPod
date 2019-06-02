import * as React from "react";
import { Input, Col, Row } from "reactstrap";
import { UserSearchCriteria } from "../../types/dto";
import GroupList from "../../../shared/components/GroupList/GroupList";
import { LookupDropDown } from "../../../shared/components/LookupDropDown/LookupDropDown";
import { SearchFilterBox, SearchFilterBoxProps, SearchFilterField } from "../../../shared/components/SearchFilterBox";
import { contextService } from "../../../shared/services";

export class UserFilterBox extends SearchFilterBox<UserSearchCriteria> {

    constructor(props: SearchFilterBoxProps) {

        const initialState = {
            contextGroupId: contextService.getDefaultSingleGroupId(),
            name: '',
            role: 'any'
        }

        super(props, initialState);
        this.handleGroupChange = this.handleGroupChange.bind(this);
    }

    getFields(): JSX.Element {
        const { contextGroupId, role, name } = this.state;
        return <Row>
            <Col md={6} lg={3}>
                <SearchFilterField titleKey="TEXT_GROUP">
                    <GroupList permissionSuffix="SEARCH" name="contextGroupId" value={contextGroupId}
                        onChange={this.handleGroupChange} />
                </SearchFilterField>
            </Col>
            <Col md={6} lg={3}>
                <SearchFilterField titleKey="TEXT_ROLE">
                    <LookupDropDown allowAny={true} textAny="TEXT_ANY_ROLE" name="role" groupId={contextGroupId} lookupKey="LIST_ROLES"
                        value={role} onChange={this.handleChange} />
                </SearchFilterField>
            </Col>
            <Col md={6} lg={3}>
                <SearchFilterField titleKey="TEXT_NAME">
                    <Input name="name" maxLength={100} value={name} onChange={this.handleChange} />
                </SearchFilterField>
            </Col>
        </Row>
    }

    validateCriteria(criteria: UserSearchCriteria): boolean {
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