import { AppRouteInfo } from "../../routes/types";
import LookupManagement from "./components/LookupManagement/LookupManagement";
import LookupDetails from "./components/LookupDetails/LookupDetails";
import LocalisationManagement from "./components/LocalisationManagement/LocalisationManagement";
import ConfigurationManagement from "./components/ConfigurationManagement/ConfigurationManagement";
import ConfigurationDetails from "./components/ConfigurationDetails/ConfigurationDetails";
import LocalisationDetails from "./components/LocalisationDetails/LocalisationDetails";


export const configurationRouteGroup: AppRouteInfo = {
    path: "/configuration",
    redirectTo: "/configuration/lookupmanagement",
    titleKey: "TEXT_CONFIGURATION",
    icon: "fa-cog",
    children: [
        {
            path: "lookupmanagement",
            section: "LOOKUP",
            titleKey: "TEXT_PAGE_TITLE",
            component: LookupManagement,
            children: [
                {
                    path: ":id",
                    titleKey: "TEXT_DETAILS",
                    component: LookupDetails
                }
            ]
        },
        {
            path: "localisationmanagement",
            section: "LOCALISATION",
            titleKey: "TEXT_PAGE_TITLE",
            component: LocalisationManagement,
            children: [
                {
                    path: ":id",
                    titleKey: "TEXT_DETAILS",
                    component: LocalisationDetails,
                }
            ]
        },
        {
            path: "configurationmanagement",
            section: "CONFIGURATION",
            titleKey: "TEXT_PAGE_TITLE",
            component: ConfigurationManagement,
            children: [
                {
                    path: ":id",
                    titleKey: "TEXT_DETAILS",
                    component: ConfigurationDetails,
                }
            ]
        }
    ]
}