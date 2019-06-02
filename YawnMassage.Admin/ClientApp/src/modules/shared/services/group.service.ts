import { applicationService } from ".";
import { ListItem } from "../types/dto";

export const groupService = {
    getGroupList,
    getGroupName,
    setGroupList
}

function getGroupList() {
    return applicationService.groupList;
}

function getGroupName(id: string) {
    let group = applicationService.groupList.find(c => c.id == id);
    return group && group.name;
}

function setGroupList(groupList: ListItem[]) {
    applicationService.groupList = sortGroupList(groupList);
}

function sortGroupList(groupList: ListItem[]) {
    return groupList.sort(function(first, second){
        if(first.name.toLowerCase() < second.name.toLowerCase()) { return -1; }
        if(first.name.toLowerCase() > second.name.toLowerCase()) { return 1; }
        return 0;
    });
}