import { contextService } from "./context.service";
import { applicationService, lookupService } from ".";

export function localise(key: string, section?: string) {

    // Get the localised text of a lookup value. Should be in LOOKUP_KEY:LOOKUP_VALUE format.     
    // This is used in routes to set the localised text in breadcrumbs from TitleKey. (Report section)
    if (key.includes(":")) {
        let lookupValues = key.split(":");
        let localisedLookupText = lookupService.getText(lookupValues[0], lookupValues[1]);
        return localisedLookupText ? localisedLookupText : key;
    }

    const uiContext = contextService.getCurrentContext();

    const groupId = uiContext.groupId;
    const culture = uiContext.culture;
    section = section || uiContext.section;

    //Get the matching posiblities and choose the first from the matches.
    //(items are already sorted according to priority)
    var texts = applicationService.localisationTexts.filter(t =>
        t.key == key
        && (t.groupId == "*" || (groupId && t.groupId == groupId))
        && (t.culture == "*" || (culture && t.culture == culture))
        && (t.section == "*" || (section && t.section == section)));

    return texts[0] ? texts[0].value : key;
}

export function localiseWithParams(key: string, params: any, section?: string) {
    let text = localise(key, section);
    for (const param in params) {
        const value = params[param];
        text = text.replace(`#${param}`, value);
    }

    return text;
}