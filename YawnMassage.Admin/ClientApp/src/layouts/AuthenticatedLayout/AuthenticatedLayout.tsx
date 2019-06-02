import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { History } from 'history';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { routeService } from '../../routes/route.service';
import { uiDomService } from 'src/modules/shared/services/ui-dom.service';
import { contextService } from '../../modules/shared/services';

interface State {
    isSidebarCollapsed: boolean;
}

interface Props {
    history: History;
}

export class AuthenticatedLayout extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);

        const collapsed = window.sessionStorage.getItem("sidebar-collapsed");
        this.state = {
            isSidebarCollapsed: collapsed == "1"
        };

        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    componentDidMount() {

        contextService.setHistoryObject(this.props.history);

        //This is to resize elements on every route change.
        uiDomService.adjustDynamicPageContentSizes()
    }

    toggleSidebar() {
        const collapsed = !this.state.isSidebarCollapsed;
        this.setState({ ...this.state, isSidebarCollapsed: collapsed })
        window.sessionStorage.setItem("sidebar-collapsed", collapsed ? "1" : "0");
    }

    render() {
        const { isSidebarCollapsed } = this.state;
        return (
            <div className={isSidebarCollapsed ? "is-collapsed" : ""}>

                <div className="page-container">
                    <Header {...this.props} toggleSidebar={this.toggleSidebar} />
                    <div className="main-content bgc-grey-300">
                        <Switch>
                            {
                                routeService.routes.filter(r => !r.isPublic).map((route, key) =>
                                    <Route path={route.path} component={route.component} key={key} />
                                )
                            }
                        </Switch>
                    </div>
                    <Footer fluid />
                </div>
                <Sidebar {...this.props} />
            </div>
        );
    }
}