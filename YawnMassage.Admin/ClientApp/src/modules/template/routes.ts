import { AppRouteInfo } from "../../routes/types";
import TemplateManagement from "./components/TemplateManagement/TemplateManagement";
import TemplateDetails from "./components/TemplateDetails/TemplateDetails";

export const templateRouteGroup: AppRouteInfo = {
  path: "/template",
  redirectTo: "/template/templatemanagement",
  titleKey: "TEXT_TEMPLATES",
  icon: "fa-file-alt",
  children: [
    {
      path: "templatemanagement",
      section: "TEMPLATE",
      titleKey: "TEXT_PAGE_TITLE",
      component: TemplateManagement,
      children: [
        {
          path: ":id",
          titleKey: "TEXT_DETAILS",
          component: TemplateDetails
        }
      ]
    }
  ]
};
