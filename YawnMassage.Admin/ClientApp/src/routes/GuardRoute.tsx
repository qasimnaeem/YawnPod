import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { routeService } from './route.service';
//import { permissionService } from '../modules/shared/services/permission.service';
//import { accountSessionService } from '../modules/shared/services';

export const GuardRoute = (props: any) => {

    const { component: Component, route, section, isPublic, ...rest } = props;

    routeService.setCurrentRoute(route);

    //var isAuthenticated = accountSessionService.isAuthenticated();
    //var hasPermission = (route.path == "/overview/dashboard" || route.path == "/account/signout"
    //        || isPublic || permissionService.canActivateRoute(route.section));

    //var canActivateRoute = isPublic ?
    //    !isAuthenticated :
    //    isAuthenticated && hasPermission;
    var canActivateRoute = true;
    const guardFailureRedirect = isPublic ?
        "/overview/dashboard" :
        "/account/login";

    return <Route {...rest} render={(props) => (
        canActivateRoute
            ? <Component {...props} />
            : <Redirect to={guardFailureRedirect} />)} />
}