import { contextService, applicationService } from ".";

export const configService =
{
    getConfigurationValue
}

function getConfigurationValue(key: string, section?: string, groupId?: string) {
    const uiContext = contextService.getCurrentContext();
    const culture = uiContext.culture;
    section = section || uiContext.section;

    var matches = applicationService.configurations.filter(c =>
        c.key == key
        && (c.groupId == "*" || (groupId && c.groupId == groupId))
        && (c.culture == "*" || (culture && c.culture == culture))
        && (c.section == "*" || (section && c.section == section)));

    return matches[0] ? matches[0].value : '';
}