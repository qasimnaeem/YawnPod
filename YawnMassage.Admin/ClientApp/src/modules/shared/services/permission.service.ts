import { AppRouteInfo } from "../../../routes/types";
import { contextService } from "./context.service";
import { applicationService } from ".";

export const permissionService = {
    canActivateRoute,
    InitializeNavigationRoutes,
    canPermissionGrant,
    getPermittedGroupsBySection,
    isActionPermittedForGroup,
    checkIfPermissionExists,
    getPermittedGroupsForSpecificPermission
}

function canActivateRoute(section?: string) {
    let permissionsObj = getPermissions();

    if (section != undefined && permissionsObj) {
        var permissionKey = 'NAV_' + section;
        return checkIfPermissionExists(permissionKey);
    }
    return false;
}

function InitializeNavigationRoutes(routes?: AppRouteInfo[]) {
    routes && routes.forEach(sectionEle => {
        sectionEle.canAccess = checkIfPermissionExists('NAV_' + sectionEle.section);
    });
}

function canPermissionGrant(action: string) {
    const section = contextService.getCurrentContext().section;
    var permissionKey = section + "_" + action;
    return checkIfPermissionExists(permissionKey);
}


function isActionPermittedForGroup(action: string, selectedGroup?: string, section?: string) {
    const context = contextService.getCurrentContext();
    selectedGroup = selectedGroup || context.groupId;
    section = section || context.section;
    var permissionKey = selectedGroup + ':' + section + "_" + action;
    
    return checkIfPermissionExistsExactMatch(permissionKey);
}

function getPermittedGroupsBySection(permissionSuffix?: string): string[] {
    var permittedGroups: string[] = [];
    var section = contextService.getCurrentContext().section;

    getPermissions().forEach((element: string) => {
        if (element.includes(section ? (section + '_' + permissionSuffix) : '')) {
            var groupId = element.split(/[:]/)[0];
            permittedGroups.push(groupId)
        }
    });

    return permittedGroups;
}

function getPermittedGroupsForSpecificPermission(permission: string){
    var permittedGroups: string[] = [];

    getPermissions().forEach((element: string) => {
        if (element.includes(permission)) {
            var groupId = element.split(/[:]/)[0];
            permittedGroups.push(groupId)
        }
    });

    return permittedGroups;
}

function getPermissions() {
    return applicationService.permissions;
}

function checkIfPermissionExists(permissionToCheck: string) {
    var permissions = getPermissions();
    for (let permission of permissions) {
        if (permission.endsWith(":" + permissionToCheck))
            return true;
    }
    return false;
}

function checkIfPermissionExistsExactMatch(permissionToCheck: string) {
    var permissions = getPermissions();
    for (let permission of permissions) {
        if (permission == permissionToCheck)
            return true;
    }
    return false;
}