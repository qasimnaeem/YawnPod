import * as React from "react";
import { SearchFilterBox, SearchFilterBoxProps, SearchFilterField } from "src/modules/shared/components/SearchFilterBox";
import { PodEventHistorySearchCriteria } from "../../types/dto";
import { Col, Row, Input, ButtonProps } from "reactstrap";
import GroupList from "src/modules/shared/components/GroupList/GroupList";
import { LookupDropDown } from "src/modules/shared/components/LookupDropDown/LookupDropDown";
import { contextService, apiService } from "src/modules/shared/services";
import { ActionButton } from "src/modules/shared/components/ActionButtons/ActionButtons";
import { alertActions } from "src/modules/shared/actions/alert.actions";
import { CountryList, CountryStateList } from "../../../shared/components/CountryLocationList";

import { DateTimePicker } from "@progress/kendo-dateinputs-react-wrapper";
import "../reports.css";

const ExportButton = (props: ButtonProps) => {
    return <ActionButton textKey="BUTTON_EXPORT" color="secondary" icon="fa-download"
        disableDefaultMargin={true} {...props} />
}

export class PodEventHistoryReportFilterBox extends SearchFilterBox<PodEventHistorySearchCriteria> {

    constructor(props: SearchFilterBoxProps) {
        let endTime = new Date();
        let startTime = new Date();
        startTime.setHours(startTime.getHours() - 24);
        const initialState = {
            contextGroupId: contextService.getDefaultSingleGroupId(false),
            podName: '',
            podGroupName: '',
            state: '',
            country: '',
            eventType: 'any',
            itemNumber: undefined,
            itemName: '',
            from: startTime.toISOString(),
            to: endTime.toISOString()
        }

        super(props, initialState);
        this.onExportClick = this.onExportClick.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    getFields(): JSX.Element {
        const { contextGroupId, podName, podGroupName, state, country, eventType: event,
            itemNumber, itemName, from, to } = this.state;

        return (
            <>
                <Row>
                    <Col md={6} lg={2}>
                        <SearchFilterField titleKey="TEXT_GROUP">
                            <GroupList hideAllOption={true} permission="POD_REPORTS_VIEW" name="contextGroupId" value={contextGroupId}
                                onChange={this.handleChange} />
                        </SearchFilterField>
                    </Col>
                    <Col md={6} lg={2}>
                        <SearchFilterField titleKey="TEXT_POD_NAME">
                            <Input name="podName" maxLength={100} value={podName} onChange={this.handleChange} />
                        </SearchFilterField>
                    </Col>
                    <Col md={6} lg={2}>
                        <SearchFilterField titleKey="TEXT_PODGROUP_NAME">
                            <Input name="podGroupName" maxLength={100} value={podGroupName} onChange={this.handleChange} />
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
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col md={6} lg={2}>
                        <SearchFilterField titleKey="TEXT_EVENT">
                            <LookupDropDown allowAny={true} textAny="TEXT_ALL" name="eventType" groupId={contextGroupId}
                                lookupKey="LIST_POD_EVENT_TYPES" value={event} onChange={this.handleChange} />
                        </SearchFilterField>
                    </Col>
                    <Col md={6} lg={2}>
                        <SearchFilterField titleKey="TEXT_ITEM_NUMBER">
                            <Input name="itemNumber" type={'number'} min={1} max={999} maxLength={3} value={itemNumber} onChange={this.handleChange} />
                        </SearchFilterField>
                    </Col>
                    <Col md={6} lg={2}>
                        <SearchFilterField titleKey="TEXT_ITEM_NAME">
                            <Input name="itemName" maxLength={100} value={itemName} onChange={this.handleChange} />
                        </SearchFilterField>
                    </Col>
                    <Col md={6} lg={2}>
                        <SearchFilterField titleKey="TEXT_START_DATETIME">
                            <DateTimePicker name="from" format={"dd-MM-yyyy HH:mm:ss"} timeFormat={"HH:mm:ss"} change={(e: any) => this.onDateChange(e, 'from')}
                                value={new Date(from)} />
                        </SearchFilterField>
                    </Col>
                    <Col md={6} lg={2} >
                        <SearchFilterField titleKey="TEXT_END_DATETIME" >
                            <DateTimePicker name="to" format={"dd-MM-yyyy HH:mm:ss"} timeFormat={"HH:mm:ss"} change={(e: any) => this.onDateChange(e, 'to')}
                                value={new Date(to)} />
                        </SearchFilterField>
                    </Col>
                </Row>
            </>);
    }

    getButtons(): JSX.Element[] {
        let buttons: JSX.Element[] = [];
        buttons.push(<ExportButton key={buttons.length} onClick={this.onExportClick} disabled={!this.props.recordsExist} />)
        return buttons;
    }

    onExportClick() {
        apiService.post('report', 'ExportPodEventsReport', this.state)
            .then(() => {
                alertActions.showSuccess("TEXT_REPORT_EXPORT_SUCCESS");
            });
    }

    validateCriteria(criteria: PodEventHistorySearchCriteria): boolean {
        return criteria.contextGroupId.length > 0;
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

    onDateChange(event: any, name: string) {
        let time = new Date().toISOString();
        if (event.sender.value())
            time = event.sender.value().toISOString();
        let e = {
            target: {
                value: time,
                name: name
            }
        }
        this.setState(Object.assign(this.state, { [name]: time }), () => super.handleChange(e));
    }
}