import { AppRouteInfo } from "../../routes/types";
import { Reports } from "./components/Reports";
import PodEventHistoryReport from "./components/PodEventHistoryReport/PodEventHistoryReport";

export const reportRouteGroup: AppRouteInfo = {
    path: "/reports",
    titleKey: "TEXT_REPORTS",
    redirectTo: '/reports/overview',
    section: "REPORTS",
    icon: "fa-chart-bar",
    children: [
        {
            path: "/overview",
            section: "REPORTS",
            component: Reports,
            children: [
                {
                    path: "/pod_event_history_report",
                    titleKey: "LIST_POD_REPORTS:POD_EVENT_HISTORY_REPORT",
                    section: "REPORTS",
                    component: PodEventHistoryReport,
                }
            ]
        }
    ]
}