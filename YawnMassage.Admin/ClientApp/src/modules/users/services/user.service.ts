import { apiService } from "../../shared/services";
import { ListItem } from "src/modules/shared/types/dto";

export const userService =
{
    generatePIN,
    activateUser,
    getEffectiveGroupForUser,
    getUsers
};

function generatePIN(userId: string) {
    return apiService.get('user', 'GetPIN', undefined, { userId })
}

function activateUser(id: string){
    return apiService.post('user','ActivateUser',{userId: id})
}

function getEffectiveGroupForUser(userId: string) {
    return apiService.get<string>('user', 'GetEffectiveGroupForUser', undefined, { userId })
}

function getUsers(groupId: string) {
    return apiService.get<ListItem[]>('user', 'GetUsersByGroup', undefined, { groupId })
        .then((data) => { return data });
}