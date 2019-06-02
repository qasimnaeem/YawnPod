import * as React from "react";
import { Row, Col } from "reactstrap";
import { localise } from "../../services";

interface Props {
    titleKey: string;
    children?: any;
}

export const SearchFilterField = (props: Props) =>
    <>
        <Row>
            <Col>
                {localise(props.titleKey)}
            </Col>
        </Row>
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
    </>