import { SearchCriteriaBase, PodConfiguration } from "../../shared/types/dto";
import { VirtualPodAccessDefinitionSnapshot, ItemConfiguration } from "./store";

export interface PodSearchCriteria extends SearchCriteriaBase {
    contextGroupId: string;
    name: string;
    country: string;
    state: string;
    area: string;
}

export interface Pod {
    id: string;
    groupId?: string;
    name: string;
    groupName: string;
    provisioningKey: string;
    hardwareId: string;
    itemCount: string;
    relayCount: number;
    country: string;
    state: string;
    area: string;
    items: PodItem[];
    configurations: PodConfiguration[];
    inheritedConfigurations: PodConfiguration[];
    isDeleted?: boolean;
    updatedByName?: string;
    updatedOnUtc?: Date;
    isLinked?: boolean;
    isVirtualPod?: boolean;
    etag?: string;
}

export interface PodItem {
    number: number;
    hardwareId: string;
    name?: string;
    type?: string;
    configurations?: PodConfiguration[];
    hasConfigurationErrors?: boolean;
}

export interface PodItemDetails {
    podId: string;
    podName: string;
    podItems: PodItem[];
}

export interface PodProvisionDto {
    provisioningKey: string;
    hardwareId: string;
    itemCount: number;
    items: PodItem[]
}

export interface PodTwinDto {
    desiredProperty?: DesiredPropertyDto;
    reportedProperty?: ReportedPropertyDto;
    podConfigurations?: PodTwinPropertyDto[];
    itemConfigurations?: ItemConfiguration[];
    podItemStatusList?: PodItemStatusDto[];
    podAccessDefSnapshot: VirtualPodAccessDefinitionSnapshot;
}

export interface DesiredPropertyDto {
    lastAccessDefinitionModifiedDate?: Date;
    lastPodConfigurationModifiedDate?:Date;
}

export interface PodItemStatusDto {
    itemIndex: number;
    itemName: string;
    lastAccessedByUserId: string;
    lastAccessedByUserName: string;
    lastAccessedOn: Date;
    itemStatus: PodItemStatus;
}

export interface ReportedPropertyDto {
    podStatus: PodTwinPropertyDto[],
    itemStatus: PodTwinPropertyDto[]
}

export interface PodTwinPropertyDto {
    key: string;
    value: any;
    lastAccessedBy?: string;
}

export interface LoginResult {
    succeeded: boolean;
    userId: string;
    errorCode: string;
}

export enum SimulationMode {
    Mirror,
    VirtualPod
}

export enum PodPowerStatus {
    Normal,
    Low
}

export enum PodNetworkStatus {
    Ok,
    Fail
}

export enum PodTamperStatus {
    On,
    Off
}

export enum PodRelayStatus {
    On,
    Off
}

export enum PodSpeakerStatus {
    On,
    Off
}

export enum PodKeypadStatus {
    On,
    Off
}

export enum PodGeneralStatus {
    On,
    Off
}

export enum PodDoorStatus {
    Open,
    Close
}

export enum PodItemStatus {
    Available = 0,
    Removed = 1,
    ForcedKey = 2,
    Overdue = 3,
    Disabled = 4,
    MultiCustody = 5,
    Interlocked = 6,
}

export enum PodItemStatusColor {
    Available = "green",
    Unavailable = "orange",
    Overdue = "red",
    Disabled = "grey",
    Interlocked = "blue",
    MultiCustody = "purple"    
}

export enum TouchScreenMode {
    RETURN_ITEM,
    MAIN_MENU,
    RETRIEVE_ITEM,
    LOGIN_SCREEN,
    RETURN_OVERRIDE,
    MULTI_CUSTODY_LOGIN_SCREEN,
    ITEM_HISTORY,
    ITEM_HISTORY_ITEM,
    EVENT_HISTORY,
    DISPLAY_NOTIFICATION,
    ABOUT_POD
}

export class PodConst {
    // Display Status Value
    static readonly STATUS_ITEM_VALUE_AVAILABLE = "TEXT_AVAILABLE";
    static readonly STATUS_ITEM_VALUE_DISABLED = "TEXT_DISABLED";
    static readonly STATUS_ITEM_VALUE_MULTICUSTODY = "TEXT_MULTICUSTODY";
    static readonly STATUS_ITEM_VALUE_REMOVED = "TEXT_REMOVED";
    static readonly STATUS_ITEM_VALUE_OVERDUE = "TEXT_OVERDUE";
    static readonly STATUS_ITEM_VALUE_FORCEDKEY = "TEXT_FORCEDKEY";
    static readonly STATUS_VALUE_ON = "TEXT_ON";
    static readonly STATUS_VALUE_OFF = "TEXT_OFF";
    static readonly STATUS_VALUE_OK = "TEXT_OK";
    static readonly STATUS_VALUE_FAIL = "TEXT_FAIL";
    static readonly STATUS_VALUE_OPEN = "TEXT_OPEN";
    static readonly STATUS_VALUE_CLOSE = "TEXT_CLOSE";
    static readonly STATUS_VALUE_POWER_NORMAL = "TEXT_NORMAL";
    static readonly STATUS_VALUE_POWER_LOW = "TEXT_LOW";
    static readonly STATUS_VALUE_START = "TEXT_START";
    // For comparision//
    static readonly STATE_DOOR = "STATE_DOOR";
    static readonly STATE_POWER = "STATE_POWER";
    static readonly STATE_NETWORK = "STATE_NETWORK";
    static readonly STATE_TAMPER = "STATE_TAMPER";
    static readonly STATE_MULTI_CUSTODY = "STATE_AUTHORISED_MULTICUSTODY";
    static readonly STATE_RELAY = "STATE_RELAY";
    static readonly STATE_SPEAKER = "STATE_SPEAKER";
    static readonly STATE_ITEM = "STATE_ITEM";
    static readonly STATE_KEYPAD = "STATE_KEYPAD";
    // Display Label//
    static readonly STATE_DISPLAY_DOOR = "STATE_DOOR";
    static readonly STATE_DISPLAY_SCREEN = "STATE_SCREEN";
    static readonly STATE_DISPLAY_POWER = "STATE_POWER";
    static readonly STATE_DISPLAY_NETWORK = "STATE_NETWORK";
    static readonly STATE_DISPLAY_TAMPER = "STATE_TAMPER";
    static readonly STATE_DISPLAY_MULTI_CUSTODY = "STATE_AUTHORISED_MULTICUSTODY";
    static readonly STATE_DISPLAY_RELAY = "STATE_RELAY";
    static readonly STATE_DISPLAY_SPEAKER = "STATE_SPEAKER";
    static readonly STATE_DISPLAY_ITEM = "STATE_ITEM";
    static readonly STATE_DISPLAY_KEYPAD = "STATE_KEYPAD";
}

export class PodEventNameConst {
    static readonly UserSignedIn = "USER_SIGNED_IN";
    static readonly UserSignedOut = "USER_SIGNED_OUT";
    static readonly DoorOpened = "DOOR_OPENED";
    static readonly DoorClosed = "DOOR_CLOSED";
    static readonly PowerLow = "POWER_LOW";
    static readonly PowerNormal = "POWER_NORMAL";
    static readonly NetworkOK = "NETWORK_OK";
    static readonly NetworkFail = "NETWORK_FAIL";
    static readonly TamperOn = "TAMPER_ON";
    static readonly TamperOff = "TAMPER_OFF";
    static readonly KeyReturned = "KEY_RETURNED";
    static readonly KeyReturnOverride = "KEY_RETURNED_OVERRIDDEN";
    static readonly KeyRemoved = "KEY_REMOVED";
    static readonly KeyForced = "KEY_FORCED";
    static readonly RelayOn = "RELAY_ON";
    static readonly RelayOff = "RELAY_OFF";
    static readonly SpeakerOn = "SPEAKER_ON";
    static readonly SpeakerOff = "SPEAKER_OFF";
    static readonly EnterMultiCustody = "MULTI_CUSTODY_ENTER";
    static readonly ExitMultiCustody = "MULTI_CUSTODY_EXIT";
    static readonly MultiCustodyWitnessAuthSuccess = "MULTI_CUSTODY_WITNESS_AUTHENTICATION_SUCCESSFUL";
    static readonly MultiCustodyWitnessAuthFail = "MULTI_CUSTODY_WITNESS_AUTHENTICATION_FAIL";
    static readonly MultiCustodyWitnessAuthProcessEnded = "MULTI_CUSTODY_WITNESS_AUTHENTICATION_PROCESS_ENDED";
    static readonly MultiCustodyFailedAttempt = "MULTI_CUSTODY_FAILED_ATTEMPT";
    static readonly MultiCustodyKeyRetreive = "MULTI_CUSTODY_KEY_RETRIEVAL";
    static readonly MultiCustodyKeyReturn = "MULTI_CUSTODY_KEY_RETURN";
    static readonly WitnessUserTimeout = "WITNESS_USER_TIMEOUT";
    static readonly DOOROPENTOOLONG = "DOOR_OPEN_TOO_LONG";
    static readonly NO_ACTIVITY = "NO_ACTIVITY";
    static readonly DOOR_LOCKED = "DOOR_LOCKED";
    static readonly DOOR_UNLOCKED = "DOOR_UNLOCKED";
}

export enum PodEventType {
    UserLogin = 0,
    UserLogout = 1,
    DoorOpen = 2,
    DoorClose = 3,
    PowerLow = 4,
    PowerNormal = 5,
    NetworkFail = 6,
    NetworkOk = 7,
    TamperOn = 8,
    TamperOff = 9,
    KeyTaken = 10,
    KeyReturn = 11,
    KeyReturnOverride = 12,
    KeyForced = 13,
    RelayOn = 14,
    RelayOff = 15,
    SpeakerOn = 16,
    SpeakerOff = 17,
    EnterMultiCustody = 18,
    ExitMultiCustody = 19,
    MultiCustodyWitnessAuthSuccess = 20,
    MultiCustodyWitnessAuthFail = 21,
    MultiCustodyWitnessAuthProcessEnded = 22,
    MultiCustodyFailedAttempt = 23,
    MultiCustodyKeyRetreive = 24,
    MultiCustodyKeyReturn = 25,
    WitnessUserTimeout = 26,
    DoorOpenTooLong = 27,
    NoActivity = 28,
    DoorLocked = 29,
    DoorUnLocked = 30
}