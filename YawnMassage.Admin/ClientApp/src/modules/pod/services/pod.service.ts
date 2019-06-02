import { apiService } from "../../shared/services";
import { ListItem } from "src/modules/shared/types/dto";
import { PodItemDetails, Pod } from "src/modules/pod/types/dto";
import { VirtualPodItem } from "../types/store";

export const podService =
{
    getPod,
    getPods,
    getPodItemsByPod,
    getPodItemsByGroup,
    provisionPod
};

function getPod(podId: string) {
    return apiService.get<Pod>('pod', undefined, [podId]);
}

function getPods(groupId: string) {
    return apiService.get<ListItem[]>('pod', 'GetPodsByGroup', undefined, { groupId })
        .then((data) => { return data });
}

function getPodItemsByPod(podId: string): Promise<PodItemDetails> {
    return apiService.get<PodItemDetails>('pod', 'GetPodItemsByPod', undefined, { podId });
}

function getPodItemsByGroup(group: string): Promise<PodItemDetails[]> {
    return apiService.get<PodItemDetails[]>('pod', 'GetPodItemsByPodGroup', undefined, { group });
}

function provisionPod(provisioningKey: string, hardwareId: string, itemCount: number, items: VirtualPodItem[]) {
    let provisioningDto = {
        provisioningKey,
        hardwareId,
        itemCount,
        items,
        relayCount: 4
    };

    return apiService.post<any>('pod', 'ProvisionVirtualPod', provisioningDto);
}

