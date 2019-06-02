import * as React from "react";
import { SheetError } from "src/modules/bulkData/types/dto";
import { Row, Col } from "reactstrap";
import { localise } from "src/modules/shared/services";
import { RowSummary } from "./RowSummary";
import "./summary-popup.css";

interface Props {
    sheet: SheetError;
}

export class SheetSummary extends React.Component<Props> {
    render() {
        const { sheet } = this.props;
        return (
            <Row>
                <Col>
                    {
                        sheet.sheetName &&
                        <Row>
                            <h5>{localise("TEXT_SHEET_NAME")}: {sheet.sheetName}</h5>
                        </Row>
                    }
                    <Row>
                        <span>{localise("TEXT_PROCESSED_ROW_COUNT")}: {sheet.totalProcessedRowCount}</span>
                    </Row>
                    <Row>
                        <span>{localise("TEXT_SUCCESSFUL_RECORDS_COUNT")}: {sheet.successObjectsCount}</span>
                    </Row>
                    {
                        sheet.errorMessage &&
                        <Row>
                            <span>{localise("TEXT_ERROR")}: {localise(sheet.errorMessage)}</span>
                        </Row>}
                    {
                        sheet.errorRows.length > 0 &&
                        <Row>
                            <Col>
                                {
                                    sheet.errorRows.map((row, key) =>
                                        <RowSummary key={key} row={row} />
                                    )
                                }
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        );
    }
}