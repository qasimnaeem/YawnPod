import * as React from "react";
import { SearchFilterBox, SearchFilterBoxProps, SearchFilterField } from "../../../shared/components/SearchFilterBox";
import { PodSearchCriteria } from "../../types/dto";
import { Col, Row, Input } from "reactstrap";
import GroupList from "../../../shared/components/GroupList/GroupList";
import { LookupDropDown } from "../../../shared/components/LookupDropDown/LookupDropDown";
import { contextService } from "../../../shared/services";
import { CountryList, CountryStateList } from "../../../shared/components/CountryLocationList";


export class PodFilterBox extends SearchFilterBox<PodSearchCriteria>{
    constructor(props: SearchFilterBoxProps) {

        const initialState = {
            // '*' group is not allowed for pods.
            contextGroupId: contextService.getDefaultSingleGroupId(false),
            name: '',
            country: 'any',
            state: 'any',
            area: 'any'
        }

        super(props, initialState);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    getFields(): JSX.Element {
        const { contextGroupId, name, country, state, area } = this.state;

        return <Row>
            <Col md={6} lg={2}>
                <SearchFilterField titleKey="TEXT_GROUP">
                    <GroupList hideAllOption={true} permissionSuffix="SEARCH" name="contextGroupId" value={contextGroupId} onChange={this.handleGroupChange} />
                </SearchFilterField>
            </Col>
            <Col md={6} lg={2}>
                <SearchFilterField titleKey="TEXT_POD_NAME">
                    <Input name="name" maxLength={100} value={name} onChange={this.handleChange} />
                </SearchFilterField>
            </Col>
            <Col md={6} lg={2}>
                <SearchFilterField titleKey="TEXT_COUNTRY">
                    <CountryList name="country" allowAny={true} value={country} onChange={this.handleCountryChange} />
                </SearchFilterField>
            </Col>
            <Col md={6} lg={2}>
                <SearchFilterField titleKey="TEXT_STATE">
                    <CountryStateList name="state" allowAny={true} selectedCountry={country} value={state} onChange={this.handleChange} />
                </SearchFilterField>
            </Col>
            <Col md={6} lg={2}>
                <SearchFilterField titleKey="TEXT_AREA">
                    <LookupDropDown allowAny={true} textAny="TEXT_ANY_AREA" name="area" groupId={contextGroupId} lookupKey="LIST_AREAS"
                        value={area} onChange={this.handleChange} />
                </SearchFilterField>
            </Col>
        </Row>
    }

    validateCriteria(criteria: PodSearchCriteria): boolean {
        return criteria.contextGroupId.length > 0
            && criteria.country.length > 0
            && criteria.state.length > 0
            && criteria.area.length > 0;
    }

    handleGroupChange(event: any) {
        let e = {
            target: {
                value: event.target.value,
                name: event.target.name
            }
        }
        this.setState({ ...this.state, area: 'any' }, () => super.handleChange(e));
    }

    handleCountryChange(event: any) {
        let e = {
            target: {
                value: event.target.value,
                name: event.target.name
            }
        }
        this.setState({ ...this.state, state: 'any' }, () => super.handleChange(e));
    }
}
