import { AppRouteInfo } from "../../routes/types";
import PermissionDetails from "./components/PermissionDetails/PermissionDetails";
import PermissionManagement from "src/modules/security/components/PermissionManagement/PermissionManagement";


export const securityRouteGroup: AppRouteInfo = {
    path: "/security",
    redirectTo: "/security/permissionmanagement",
    titleKey: "TEXT_PERMISSIONS",
    icon: "fa-shield-alt",
    children: [
        {
            path: "permissionmanagement",
            section: "PERMISSION",
            titleKey: "TEXT_PAGE_TITLE",
            component: PermissionManagement,
            children: [
                {
                    path: ":id",
                    titleKey: "TEXT_DETAILS",
                    component: PermissionDetails
                }
            ]
        },
    ]
}