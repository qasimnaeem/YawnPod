import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { localise } from '../../modules/shared/services/localisation.service';
import AppBreadcrumbs from '../AppBreadcrumbs/AppBreadcrumbs';
import { UserMenu } from './UserMenu';
import { routeService } from '../../routes/route.service';

interface Props {
    toggleSidebar?: () => void;
}

export const Header = (props: Props) => {

    const route = routeService.getCurrentRoute();
    let titleKey = (route && route.titleKey) || "TEXT_PAGE_TITLE";
    if (titleKey == "TEXT_DETAILS")
        titleKey = "TEXT_PAGE_TITLE";

    return <div className="header navbar">
        <div className="header-container">
            <Row className="header-top-row">
                <Col xs="auto">
                    <ul className="nav-left d-none d-md-inline-block">
                        <li>
                            <a id="sidebar-toggle" onClick={props.toggleSidebar} className="sidebar-toggle" href="javascript:void(0);">
                                <i className="ti-menu"></i>
                            </a>
                        </li>
                    </ul>
                </Col>
                <Col className="text-center text-truncate align-self-center">
                    <h3>{localise(titleKey)}</h3>
                </Col>
                <Col xs="auto">
                    <ul className="nav-right">
                        <UserMenu />
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col className="pl-5 text-truncate">
                    <AppBreadcrumbs {...props as any} />
                </Col>
            </Row>
        </div>
    </div>
}

export default Header;
