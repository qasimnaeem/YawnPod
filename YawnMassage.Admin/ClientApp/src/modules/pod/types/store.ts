import { PodDoorStatus, SimulationMode, PodPowerStatus, PodItemStatus, PodNetworkStatus, PodTamperStatus, PodTwinPropertyDto, PodEventType, PodRelayStatus, PodSpeakerStatus, TouchScreenMode } from "./dto";
import { PodConfiguration } from "src/modules/shared/types/dto";

export interface PodSimulationState {
    groupId?: string;
    podId?: string;
    podName?: string;
    podGroupName?: string;
    hardwareId?: string;
    provisioningKey?: string;
    itemCount?: number;
    linked?: boolean;
    loggedInUserId?: string;
    loggedInUserAlternateId?: string;
    loggedInUserName?: string;
    userLoggedIn?: boolean;
    loginError?: string;
    simulationMode?: SimulationMode;
    doorStatus?: PodDoorStatus;
    powerStatus?: PodPowerStatus;
    networkStatus?: PodNetworkStatus;
    tamperStatus?: PodTamperStatus;
    speakerStatus?: PodSpeakerStatus;
    users?: VirtualPodUser[];
    items?: VirtualPodItem[];
    relays?: VirtualPodRelay[];
    podConfigurations?: PodTwinPropertyDto[];
    itemConfigurations?: ItemConfiguration[];
    podStatus?: PodTwinPropertyDto[];
    lastAccessDefinitionModifiedDate?: Date;
    lastPodConfigurationModifiedDate?: Date;
    events?: PodEvent[];
    eventPublishingInProgress?: boolean;
    accessDefinitionSnapshot?: VirtualPodAccessDefinitionSnapshot;
    eventHistory?: PodEvent[];
    itemHistory?: PodItemEvent[];
    touchScreenEventHistory?: PodEvent[];
    podEventContinuationToken?: string;
    podItemEventContinuationToken?: string;
    touchScreenPodEventContinuationToken?: string;
    touchScreenMode?: TouchScreenMode;
    blinkItemIndex?: number;
    isMultiCustodyLogin?: boolean;
    previousTouchScreenMode?: TouchScreenMode;
    multiCustodyLoginItemIndex?: number;
    multiCustodyWitnessCount?: number;
    multiCustodyLoginSuccessCount?: number;
    multiCustodyTemparyLoginCount?: number;
    multiCustodyLoginSuccessUsers?: string[];
    multiCustodyFailedLoginAttempts?: number;
    item?: VirtualPodItem;
    podTimerTimeInSeconds?: number;
    doorTimeOutRemaningSeconds?: number;
    hasGlobalTimerTriggered?:boolean;
}

export interface VirtualPodUser {
    id: string;
    name: string;
    userId?: string;
    pin?: string;
    claimConstraintIds?: string[]
}

export interface VirtualPodItem {
    itemIndex: number;
    hardwareId: string;
    name?: string;
    status: PodItemStatus;
    currentStatus: PodItemStatus;
    lastAccessedByUserId?: string;
    lastAccessedByUserName?: string;
    lastAccessedOn?: Date;
    interlockGroup?: string;
    configurations?: PodConfiguration[];
    multiCustodyWitnessCount?: number;
    canReturnWithoutWitness?: boolean;
}

export interface ItemConfiguration {
    key: number;
    value: PodTwinPropertyDto[];
}

export interface Configuration{
    key: string;
    value: string;
}

export interface PodEvent {
    id: string;
    eventType: PodEventType;
    eventName: string;
    eventDetails?: any;
    eventTriggeredByUserId?: string;
    eventTriggeredByUserName?: string;
    eventTriggeredOn: Date;
}

export interface PodItemEvent {
    id: string;
    eventType: PodEventType;
    eventName: string;
    eventDetails?: any;
    eventTriggeredByUserId?: string;
    eventTriggeredByUserName?: string;
    eventTriggeredOn: Date;
}

export interface VirtualPodRelay {
    relayIndex: number;
    status: PodRelayStatus;
}

export interface VirtualPodAccessDefinitionSnapshot {
    users: VirtualPodUser[];
    itemAssignments: VirtualPodItemAssignment[];
    timeConstraints: VirtualPodTimeConstraint[];
    claimConstraints: ClaimConstraint[]
}

export interface ClaimConstraint {
    id: string,
    claimGroupName: string,
    claimList: string[]
}

export interface VirtualPodItemAssignment {
    itemId: string;
    userId: string;
    timeConstraintIds: string[];
}

export interface VirtualPodTimeConstraint {
    id: string;
    schedule: string;
    scheduleValues?: string[];
    accessAllowedFromTimeUtc?: Date;
    accessAllowedToTimeUtc?: Date;
    validFromUtc?: Date;
    validToUtc?: Date;
}