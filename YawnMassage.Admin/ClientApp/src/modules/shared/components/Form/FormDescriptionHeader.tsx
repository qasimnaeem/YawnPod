import * as React from "react";
import { Row, Col } from "reactstrap";
import { localise } from "../../services";

const FormDescriptionHeader = () =>
    <Row className="mb-4">
        <Col>
            <small className="text-muted"> {localise("TEXT_PAGE_DESCRIPTION")} </small>
        </Col>
        <Col md="auto">
            <small className="text-muted"> {localise('TEXT_REQUIRED_FIELD')} </small>
        </Col>
    </Row>

export default FormDescriptionHeader