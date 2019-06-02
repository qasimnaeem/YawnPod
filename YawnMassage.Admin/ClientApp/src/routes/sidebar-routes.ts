import { AppRouteInfo } from "./types";
import { overviewRouteGroup } from "../modules/overview/routes";
import { userRouteGroup } from "../modules/users/routes";
import { configurationRouteGroup } from "../modules/configuration/routes";
import { securityRouteGroup } from "../modules/security/routes";
import { podRouteGroup } from "../modules/pod/routes";
import { bulkDataRouteGroup } from "../modules/bulkData/routes";
import { reportRouteGroup } from "../modules/reports/routes";
import { templateRouteGroup } from "../modules/template/routes";

export const sidebarRoutes: AppRouteInfo[] = [
  overviewRouteGroup,
  userRouteGroup,
  podRouteGroup,
  securityRouteGroup,
  templateRouteGroup,
  reportRouteGroup,
  bulkDataRouteGroup,
  configurationRouteGroup
];
