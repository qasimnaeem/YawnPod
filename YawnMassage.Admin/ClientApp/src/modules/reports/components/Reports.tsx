import * as React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardBody, Row, Col } from 'reactstrap';
import { lookupService, permissionService } from 'src/modules/shared/services';

export class Reports extends React.Component {

    getMasterListLookup() {
        let lookupList = lookupService.getList("LIST_MASTER_REPORTS");
        return lookupList;
    }

    isPermittedToView(lookupItemValue: string) {
        return permissionService.checkIfPermissionExists(lookupItemValue + '_VIEW');
    }

    getReportsInsideSection(childLookupKey: string) {
        let lookupList = lookupService.getList(childLookupKey);
        return (
            lookupList.map((lookupItem) => {
                let reportUrl = (lookupItem.value && lookupItem.value.toLowerCase()) || "";
                return (
                    <li key={reportUrl}> <Link to={ `/reports/overview/${reportUrl}`}>{lookupItem.text} </Link> </li>
                );
            })
        );
    }

    render() {
        const lookupList = this.getMasterListLookup();
        return (
            <div>
                {lookupList.map((lookupItem) => {
                    return (lookupItem.value && this.isPermittedToView(lookupItem.value) &&
                        <Card key={lookupItem.value} className="page-fixed-content compact">
                            <CardBody>
                                <Row>
                                    <Col>
                                        <h4>{lookupItem.text}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <ul>
                                        {lookupItem.childLookupKey && this.getReportsInsideSection(lookupItem.childLookupKey)}
                                    </ul>
                                </Row>
                            </CardBody>
                        </Card>)
                })}
            </div>
        );
    }
}


