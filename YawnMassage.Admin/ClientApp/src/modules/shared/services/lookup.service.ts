import { contextService, applicationService } from ".";

export const lookupService = {
    getList,
    getText,
    getRemark
}

function getText(lookupKey: string, value: string, groupId?: string, culture?: string, section?: string) {
    const list = getList(lookupKey, groupId, culture, section);
    const item = list.find(item => item.value == value);
    return item ? item.text : `${lookupKey}:${value}`;
}

function getRemark(lookupKey: string, value: string, groupId?: string, culture?: string, section?: string) {
    const list = getList(lookupKey, groupId, culture, section);
    const item = list.find(item => item.value == value);
    return item ? item.remark : `${lookupKey}:${value}`;
}

function getList(key: string, groupId?: string, culture?: string, section?: string) {

    const uiContext = contextService.getCurrentContext();
    groupId = groupId || uiContext.groupId;
    culture = culture || uiContext.culture;
    section = section || uiContext.section;
    //Get the matching possibilities and choose the first from the matches.
    //(lookups are already sorted according to priority)
    var matches = applicationService.lookups.filter(l =>
        l.key == key
        && (l.groupId == "*" || (groupId && l.groupId == groupId))
        && (l.culture == "*" || (culture && l.culture == culture))
        && (l.section == "*" || (section && l.section == section)));

    return matches[0] ? matches[0].items : [];
}