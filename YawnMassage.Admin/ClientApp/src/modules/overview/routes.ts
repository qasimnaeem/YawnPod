import { AppRouteInfo } from "../../routes/types";
import Dashboard from "./components/Dashboard/Dashboard";

export const overviewRouteGroup: AppRouteInfo = {
    path: "/overview",
    redirectTo: "/overview/dashboard",
    titleKey: "TEXT_OVERVIEW",
    icon: "fa-chart-line",
    children: [
        {
            path: "dashboard",
            section: "DASHBOARD",
            titleKey: "TEXT_PAGE_TITLE",
            component: Dashboard
        }
    ]
}