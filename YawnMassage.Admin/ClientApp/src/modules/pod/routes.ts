import { AppRouteInfo } from "../../routes/types";
import PodManagement from "./components/PodManagement/PodManagement";
import PodDetails from "./components/PodDetails/PodDetails";

export const podRouteGroup: AppRouteInfo = {
    path: '/pod',
    redirectTo: '/pod/podmanagement',
    titleKey: 'TEXT_PODS',
    icon: "fa-server",
    children: [
        {
            path: "podmanagement",
            section: "POD",
            titleKey: "TEXT_PAGE_TITLE",
            component: PodManagement,
            children: [
                {
                    path: ":id",
                    titleKey: "TEXT_DETAILS",
                    component: PodDetails,
                    children: [
                    ]
                }
            ]
        }
    ]
}