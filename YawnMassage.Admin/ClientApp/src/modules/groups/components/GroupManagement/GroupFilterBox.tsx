import * as React from "react";
import { Input, Col, Row } from "reactstrap";
import { GroupSearchCriteria } from "../../types/dto";
import { SearchFilterBox, SearchFilterBoxProps, SearchFilterField } from "../../../shared/components/SearchFilterBox";

const initialState = {
    name: '',
}

export class GroupFilterBox extends SearchFilterBox<GroupSearchCriteria> {

    constructor(props: SearchFilterBoxProps) {
        super(props, initialState);  
    }

    getFields(): JSX.Element {
        const { name } = this.state;
        return <Row>
            <Col md={6} lg={3}>
                <SearchFilterField titleKey="TEXT_GROUP">
                    <Input name="name" maxLength={100} value={name} onChange={this.handleChange} />
                </SearchFilterField>
            </Col>
        </Row>
    }

    validateCriteria(): boolean {
        return true;
    }
}