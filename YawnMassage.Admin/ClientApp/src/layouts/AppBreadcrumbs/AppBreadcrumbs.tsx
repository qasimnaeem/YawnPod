import * as React from 'react';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import './app-breadcrumbs.css'
import { routeService } from '../../routes/route.service';
import { localise } from '../../modules/shared/services';

class AppBreadcrumbs extends React.Component {

    routesForBreadcrumbs: {};

    constructor(props: {}) {
        super(props)
        this.routesForBreadcrumbs = this.getRoutesForBreadcrumbs();
    }

    getRoutesForBreadcrumbs() {
        let routes = {};
        routeService.routes.forEach(r => {
            let path = r.path ? r.path : '';
            let name = r.titleKey ? localise(r.titleKey, r.section) : "";
            routes[path] = name;
        });
        return routes;
    }

    render() {
        return <Breadcrumbs mappedRoutes={this.routesForBreadcrumbs}
            WrapperComponent={(props: any) => <ol className="breadcrumb">{props.children}</ol>}
            ActiveLinkComponent={(props: any) => <li className="breadcrumb-item active">{props.children}</li>}
            LinkComponent={(props: any) => <li className="breadcrumb-item">{props.children}</li>} />
    }
}

export default AppBreadcrumbs;