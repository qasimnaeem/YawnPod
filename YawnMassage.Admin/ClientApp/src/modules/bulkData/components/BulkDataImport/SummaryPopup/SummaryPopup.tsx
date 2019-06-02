import * as React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Row, Col } from "reactstrap";
import { BackButton } from "src/modules/shared/components/ActionButtons/ActionButtons";
import { bulkDataservice } from "src/modules/bulkData/services/bulkDataservice";
import { SheetError } from "src/modules/bulkData/types/dto";
import { localise, groupService, lookupService, apiService } from "src/modules/shared/services";
import { SheetSummary } from "./SheetSummary";
import "./summary-popup.css";

interface Props {
    item: any;
}

interface State {
    showPopup: boolean;
    errorLogs: SheetError[];
}

export class SummaryPopup extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showPopup: false,
            errorLogs: []
        }
        this.onSummaryClick = this.onSummaryClick.bind(this);
    }

    onBackClick() {
        this.setState({ ...this.state, errorLogs: [], showPopup: false });
    }

    onSummaryClick() {
        const { item } = this.props;
        console.log(item);

        apiService.get('bulkData', 'GetImportLogFileUrl', undefined, { id: item['id'] })
            .then((url: string) => {
                bulkDataservice.getLogFile(url)
                    .then((result) => {
                        this.setState({
                            ...this.state,
                            errorLogs: result.data as SheetError[],
                            showPopup: true
                        });
                    });
            });
    }

    render() {
        const { item } = this.props;
        const { errorLogs } = this.state;
        let hasMetaError = errorLogs.length == 1 && errorLogs[0].errorMessage;

        return (
            <>
                <i title={localise("TEXT_VIEW_SUMMARY")} className="fa fa-file-alt summary-icon"
                    onClick={this.onSummaryClick} aria-hidden="true"></i>
                {
                    this.state.showPopup
                    &&
                    <Dialog width={600} height={500}>
                        <Row>
                            <Col>
                                <BackButton onClick={() => this.onBackClick()} />
                                <Row className="summary-title-row">
                                    <h3>{localise("TEXT_LOG_SUMMARY")}</h3>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <Row className="summary-body">
                            {
                                hasMetaError
                                    ?
                                    <Col>
                                        <Row>
                                            <span>
                                                {localise("TEXT_FILE_ERROR")}: {localise(errorLogs[0].errorMessage || "ERROR_UNKNOWN")}
                                            </span>
                                        </Row>
                                    </Col>
                                    :
                                    <Col>
                                        <Row>
                                            <span>
                                                {localise("TEXT_GROUP")}: {item.groupId == "any" ?
                                                    localise("TEXT_ANY_GROUP") :
                                                    groupService.getGroupName(item.groupId)}
                                            </span>
                                        </Row>
                                        <Row>
                                            <span>{localise("TEXT_FILE_NAME")}: {item.fileName}</span>
                                        </Row>
                                        <Row>
                                            <span>
                                                {localise("TEXT_FILE_STATUS")}: {lookupService
                                                    .getText("LIST_BULKDATA_OPERATION_STATUSES", item.operationStatusCode)}
                                            </span>
                                        </Row>
                                        {
                                            errorLogs.map((log, key) =>
                                                <div key={key} >
                                                    <hr className="summary-sheet-separator" />
                                                    <SheetSummary sheet={log} />
                                                </div>
                                            )
                                        }
                                    </Col>
                            }
                        </Row>

                    </Dialog>
                }
            </>
        );
    }
}