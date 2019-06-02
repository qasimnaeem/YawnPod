import { History, Location } from 'history';
import * as qs from "query-string";
import { UiContext } from "../types/dto";

let currentGroupId: string;

 //Will hold custsomer id of the user if the user belongs to only one group.
let singleGroupId: string | undefined;

let currentSection: string;
let currentCulture: string;
let historyTracker: History;

export const contextService = {
    getCurrentContext,
    setHistoryObject,
    setCurrentGroupFromUrl,
    setCurrentGroup,
    setSingleGroupId,
    setCurrentSection,
    setCurrentCulture,
    getDefaultSingleGroupId
}

function getCurrentContext(): UiContext {
    return {
        groupId: singleGroupId || currentGroupId,
        section: currentSection,
        culture: currentCulture
    }
}

//Set the group context on initial page load.
const hashParts = window.location.hash.split("?");
setGroupUsingQueryParams(hashParts && hashParts[1])

function setHistoryObject(history: History) {

    if (historyTracker) //Assign only once.
        return;

    historyTracker = history;

    //Start watching url changes and update the group context accordingly.
    historyTracker.listen((location: Location) => {
        setGroupUsingQueryParams(location.search);
    })
}

function setGroupUsingQueryParams(query: string) {
    const params = qs.parse(query);
    let groupId = params.contextGroupId || "*";
    setCurrentGroup(groupId);
}

function setCurrentGroupFromUrl(location: Location) {
    setGroupUsingQueryParams(location.search)
}

function setCurrentGroup(groupId: string) {
    currentGroupId = groupId;
}

function setSingleGroupId(groupId?: string) {
    singleGroupId = groupId;
}

//Used to load default value for group dropdowns.
function getDefaultSingleGroupId(allowAllGroup: boolean = true) {

    if (singleGroupId == "*" && !allowAllGroup)
        return "";

    return singleGroupId || "";
}

function setCurrentSection(section: string) {
    currentSection = section;
}

function setCurrentCulture(culture: string) {
    currentCulture = culture;
}