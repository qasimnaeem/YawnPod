import { AppRouteInfo } from "../../routes/types";
import GroupManagement from "./components/GroupManagement/GroupManagement";
import GroupDetails from "./components/GroupDetails/GroupDetails";

export const groupRouteGroup: AppRouteInfo = {
    path: "/groups",
    redirectTo: "/groups/groupmanagement",
    titleKey: "TEXT_GROUPS",
    icon: "fa-globe",
    children: [
        {
            path: "groupmanagement",
            section: "GROUP",
            titleKey: "TEXT_PAGE_TITLE",
            component: GroupManagement,
            children: [
                {
                    path: ":id",
                    titleKey: "TEXT_DETAILS",
                    component: GroupDetails
                }
            ]
        }
    ]
}