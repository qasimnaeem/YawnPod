import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { AppRouteInfo } from '../../routes/types';
import { Location } from 'history';
import { routeService } from '../../routes/route.service';
import { localise } from '../../modules/shared/services';
import { permissionService } from '../../modules/shared/services';

interface Props {
    route: AppRouteInfo
    location: Location
}

interface State {
    menuOpen: boolean;
}

const SidebarIconMenu = (props: { name?: string, icon?: string }) =>
    <React.Fragment>
        <span className="icon-holder mr-1">
            <i className={"fas " + props.icon}></i>
        </span>
        <span className="title">{props.name}</span>
    </React.Fragment>

export class SidebarMenuGroup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { menuOpen: false };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.activeRoute.bind(this);
    }

    toggleMenu() {
        this.setState({
            ...this.state,
            menuOpen: !this.state.menuOpen
        })
    }

    // verifies if the current route is inside the menu route.
    activeRoute(route: AppRouteInfo) {
        const currentRoute = routeService.getCurrentRoute();
        return currentRoute && currentRoute.path.split('/')[1] == route.path.split('/')[1] ? 'active' : '';
    }
  

    render() {
        let { route } = this.props;
        const { menuOpen } = this.state;
        const name = route.titleKey ? localise(route.titleKey, route.section) : "";
        const icon = route.icon;
        const active = this.activeRoute(route);
        permissionService.InitializeNavigationRoutes(this.props.route.children);
        if (route.children && route.children.length > 1) {
            var permittedRoutes = route.children.filter(a => a.canAccess);
            return permittedRoutes.length > 0 &&
                <Dropdown tag="li" direction="right" isOpen={menuOpen} toggle={this.toggleMenu} className={"nav-item " + active}>
                    <DropdownToggle tag="a" href="javascript:void(0);" className="sidebar-link">
                        <SidebarIconMenu name={name} icon={icon} />
                    </DropdownToggle>
                    <DropdownMenu tag="ul" className="fsz-sm">
                        {
                            route.children.map((r, key) =>
                                r.canAccess && <li key={key}>
                                    <NavLink to={r.path} activeClassName="active">
                                        {r.titleKey ? localise(r.titleKey, r.section) : ""}
                                    </NavLink>
                                </li>
                            )
                        }
                    </DropdownMenu>
                </Dropdown>
        }
        else {

            //Don't display a sub menu if there's only one child route.
            route = (route.children && route.children.length == 1) ? route.children[0] : route;
//route.canAccess &&
return <li className={"nav-item " + active} title={name}>
                <Link to={route.path} className="sidebar-link">
                        <SidebarIconMenu name={name} icon={icon} />
                    </Link>     
            </li>
        }
    }
}