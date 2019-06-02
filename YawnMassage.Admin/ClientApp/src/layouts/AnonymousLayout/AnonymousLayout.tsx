import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { History } from 'history';
import { Row, Col } from 'reactstrap';
import { routeService } from '../../routes/route.service';
import { contextService, localise, configService } from '../../modules/shared/services';
interface Props {
    history: History;
}

export class AnonymousLayout extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        contextService.setHistoryObject(this.props.history);
    }

    render() {
        let systemLogoURL  = configService.getConfigurationValue('SYSTEM_LOGO_URL','*','*');
        return (
            <div className="full-container bgc-grey-300 d-flex flex-column align-items-stretch">
                <Row className="side-panes-container">
                    <Col xs={12} md={5} lg={6} className="side-left-pane d-flex">
                        <div className="align-self-center text-center ml-auto mr-auto p-2">
                            <img src={systemLogoURL} width="60px"  alt={localise("TEXT_COMPANY_NAME")} />
                            <h2 style={{color: "white"}}>{localise("TEXT_COMPANY_NAME")}</h2>
                        </div>
                    </Col>

                    <Col xs={12} md={7} lg={6} className="d-flex p-40">
                        <div className="align-self-center ml-auto mr-auto">
                            <Switch>
                                {
                                    routeService.routes.map((route, key) =>
                                        <Route path={route.path} component={route.component} key={key} />
                                    )
                                }
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
