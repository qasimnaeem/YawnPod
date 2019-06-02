import { AppRouteInfo } from "../../routes/types";
import UserManagement from "./components/UserManagement/UserManagement";
import UserDetails from "./components/UserDetails/UserDetails";

export const userRouteGroup: AppRouteInfo = {
    path: "/users",
    redirectTo: "/users/usermanagement",
    titleKey: "TEXT_USERS",
    icon: "fa-user",
    children: [
        {
            path: "usermanagement",
            section: "USER",
            titleKey: "TEXT_PAGE_TITLE",
            component: UserManagement,
            children: [
                {
                    path: ":id",
                    titleKey: "TEXT_DETAILS",
                    component: UserDetails
                }
            ]
        }
    ]
}