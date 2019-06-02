import { store } from "src/redux/store"
import * as constants from "../constants/notification-dialog.constants";
import { localise } from ".";

export const notificationDialogService = {
    showDialog,
    hideDialog,
    dialogOK,
}

let okCallback: () => void;

function showDialog(messageKey: string, okCallbackFn: () => void,
    titleKey?: string) {

    titleKey = titleKey || "NOTIFICATION_TITLE";
    okCallback = okCallbackFn;

    store.dispatch(showNotificationDialogAction(localise(messageKey), localise(titleKey)));
}

function hideDialog() {
    store.dispatch(hideNotificationDialogAction());
}

function dialogOK() {
    okCallback && okCallback();
}

export interface NotificationDialogAction {
    type: constants.NOTIFICATION_DIALOG_SHOW | constants.NOTIFICATION_DIALOG_HIDE;
    visibility?: boolean,
    message?: string,
    title?: string
}

function showNotificationDialogAction(message: string, title: string): NotificationDialogAction {
    return {
        type: constants.NOTIFICATION_DIALOG_SHOW,
        visibility: true,
        message,
        title
    };
}

function hideNotificationDialogAction(): NotificationDialogAction {
    return {
        type: constants.NOTIFICATION_DIALOG_SHOW,
    };
}