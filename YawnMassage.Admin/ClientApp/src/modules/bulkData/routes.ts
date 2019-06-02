import { AppRouteInfo } from "../../routes/types";
import BulkDataManagement from "./components/BulkDataManagement/BulkDataManagement";

export const bulkDataRouteGroup: AppRouteInfo = {
    path: '/bulkdata',
    redirectTo: '/bulkdata/bulkdatamanagement',
    titleKey: 'TEXT_BULKDATA',
    icon: "fa-database",
    children: [
        {
            path: "bulkdatamanagement",
            section: "BULKDATA",
            titleKey: "TEXT_PAGE_TITLE",
            component: BulkDataManagement,
        }
    ]
}