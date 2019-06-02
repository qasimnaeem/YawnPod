import * as React from "react";
import { Row, Col, CardBody, Card, Form, Label, Input } from "reactstrap";
import { ActionButton, NewButton } from "../ActionButtons/ActionButtons";
import * as qs from "query-string";
import { History, Location, UnregisterCallback } from "history";
import { localise } from "../../services";
import { SearchCriteriaBase } from "../../types/dto";
import "./SearchFilterBox.css";
import { permissionService } from "../../services/permission.service";

export interface SearchFilterBoxProps {
    history: History;
    onNewClick?: () => void;
    recordsExist?: boolean;
    hideIncludeDeleteOption?: boolean;
    searchPermission?: string;
}

export abstract class SearchFilterBox<T extends SearchCriteriaBase> extends React.Component<SearchFilterBoxProps, T> {
    constructor(props: SearchFilterBoxProps, childState: T) {
        super(props);

        this.initialState = Object.assign({ includeDeleted: false }, childState);
        (this.state as any) = this.initialState;

        this.toggleIncludeDeleted = this.toggleIncludeDeleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isPermittedToSearch = this.isPermittedToSearch.bind(this);
    }

    initialState: T;
    historyUnlisten: UnregisterCallback;

    abstract validateCriteria(criteria: T): boolean;

    getButtons(): JSX.Element[] {
        return [];
    }

    getFields(): JSX.Element {
        return <></>;
    }

    componentDidMount() {
        this.setSearchCriteriaFromUrl(this.props.history.location);
        this.historyUnlisten = this.props.history.listen((location) => {
            this.setSearchCriteriaFromUrl(location);
        });
    }

    componentWillUnmount() {
        this.historyUnlisten();
    }

    setSearchCriteriaFromUrl(location: Location) {
        const criteria = qs.parse(location.search);

        const includeDeleted = criteria.includeDeleted && JSON.parse(criteria.includeDeleted) || false;

        this.setState(this.initialState);
        this.setState(Object.assign(criteria, {
            includeDeleted: includeDeleted
        }));
    }

    handleChange(event: any) {
        const { name, value } = event.target;
        this.setState(Object.assign(this.state, { [name]: value }));
    }

    onSubmit(event: any) {
        event.preventDefault();

        const criteria = qs.parse(this.props.history.location.search);
        this.props.history.push({
            pathname: "",
            search: qs.stringify(Object.assign(criteria, this.state))
        });
    }

    toggleIncludeDeleted(e: any) {
        this.setState(Object.assign(this.state,
            { includeDeleted: !this.state.includeDeleted }
        ));
    }

    isPermittedToSearch() {
        const { searchPermission } = this.props;
        if (searchPermission)
            return permissionService.checkIfPermissionExists(searchPermission);
        return permissionService.canPermissionGrant('SEARCH');
    }

    render() {
        const isValid = this.validateCriteria(this.state);

        return (
            <Card className="page-fixed-content search-filter-box compact">
                <CardBody>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col xs={12} md>
                                <Row className="mb-2">
                                    <Col>
                                        {this.getFields()}
                                    </Col>
                                </Row>
                                {!this.props.hideIncludeDeleteOption && <Row>
                                    <Col>
                                        <Label check>
                                            <Input type="checkbox" checked={this.state.includeDeleted} onChange={this.toggleIncludeDeleted} />
                                            {localise('CHECK_INCLUDE_DELETED_RECORDS')}
                                        </Label>
                                    </Col>
                                </Row>}
                            </Col>
                            <Col xs={12} md="auto" className="d-flex flex-column pt-2 pt-md-0">
                                <NewButton onClick={this.props.onNewClick} />
                                {...this.getButtons()}
                                <ActionButton type="submit" className="mt-2 mt-md-auto" disabled={!isValid} textKey="BUTTON_SEARCH" color="primary"
                                    isPermissionAllowed={this.isPermittedToSearch()} icon="fa-search" disableDefaultMargin={true} />
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}