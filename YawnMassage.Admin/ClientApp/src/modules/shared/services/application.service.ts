import { LocalisationText, Lookup, Configuration, ListItem } from "../types/dto";
import { coreApiService } from "./core-api.service";
import { contextService } from ".";

let localisationTexts: LocalisationText[] = [];
let lookups: Lookup[] = [];
let configurations: Configuration[] = [];
let groupList: ListItem[] = [];
let permissions: string[] = [];

export const applicationService = {
    initializeApplicationData,
    clearSensitiveData,
    localisationTexts,
    lookups,
    configurations,
    groupList,
    permissions
}

function initializeApplicationData(isAuthenticated: boolean) {

    let promises: Promise<any>[] = [initializeLocalisations(),initialiseConfigurations()];

    if (isAuthenticated) {
        promises.push(
            initializeLookups(),            
            initialiseGroups(),
            initializePermissions());
    }

    return Promise.all(promises);
}

function clearSensitiveData() {
    lookups.length = 0;
    configurations.length = 0;
    groupList.length = 0;
    permissions.length = 0;
}

function refreshDataArray<T>(action: string, array: T[]) {
    return coreApiService.get<T[]>("application", action)
        .then(response => {
            array.length = 0;
            array.push(...response.data);
        });
}

function initializeLocalisations() {
    return refreshDataArray<LocalisationText>("GetUILocalisations", localisationTexts);
}

function initializeLookups() {
    return refreshDataArray<Lookup>("GetUILookups", lookups);
}

function initialiseConfigurations() {
    return refreshDataArray<Configuration>("GetConfigurations", configurations);
}

function initialiseGroups() {

    return new Promise<void>(resolve => {

        refreshDataArray<ListItem>("GetGroupList", groupList)
            .then(() => {
                contextService.setSingleGroupId(
                    (groupList.length == 1) ? groupList[0].id : undefined);
                resolve();
            })
    })
}

function initializePermissions() {
    return refreshDataArray<string>("GetPermissions", permissions);
}