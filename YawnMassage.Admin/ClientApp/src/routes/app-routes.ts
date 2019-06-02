import { AppRouteInfo } from "./types";
import { overviewRouteGroup } from "../modules/overview/routes";
import { userRouteGroup } from "../modules/users/routes";
import { configurationRouteGroup } from "../modules/configuration/routes";
import { accountRouteGroup } from "../modules/account/routes";
import { securityRouteGroup } from "../modules/security/routes";
import { groupRouteGroup } from "../modules/groups/routes";
import { podRouteGroup } from "../modules/pod/routes";
import { bulkDataRouteGroup } from "../modules/bulkData/routes";
import { reportRouteGroup } from "../modules/reports/routes";
import { templateRouteGroup } from "../modules/template/routes";


export const appRoutes: AppRouteInfo[] = [
  accountRouteGroup,
  overviewRouteGroup,
  groupRouteGroup,
  userRouteGroup,
  groupRouteGroup,
  bulkDataRouteGroup,
  configurationRouteGroup,
  podRouteGroup,
  reportRouteGroup,
  templateRouteGroup,
  securityRouteGroup,  
  {
    path: "/",
    redirectTo: "/overview/dashboard",
    titleKey: "TEXT_HOME"
  }
];
