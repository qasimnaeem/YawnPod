import * as React from "react";
import { ActionButton } from "src/modules/shared/components/ActionButtons/ActionButtons";
import { notificationDialogService } from "src/modules/shared/services/notification-dialog.service";
import { store } from "src/redux/store";
import { configService } from "src/modules/shared/services/configuration.service";
import { formValueSelector } from "redux-form";
import { localiseWithParams } from "src/modules/shared/services/localisation.service";
import { permissionService } from "src/modules/shared/services";
import { userService } from "../../services/user.service";
import { alertActions } from "../../../shared/actions/alert.actions";
import { DetailFormProps } from "../../../shared/components/DetailPage";

const UserHeaderButton = (formProps: DetailFormProps) => {

    function showPINPopup() {

        getEffectiveGroupForUser()
            .then(groupId => {
                userService.generatePIN(groupId).then((pin: any) => {
                    formProps.change('pin', pin);

                    const shouldDisplayPIN: string = configService.getConfigurationValue("DISPLAY_PIN", undefined, groupId);
                    const message = (shouldDisplayPIN && shouldDisplayPIN.toLowerCase() == 'true') ?
                        localiseWithParams('PIN_SUCCESS_MESSAGE', { "pin": pin }) :
                        'PIN_SUCCESS_MESSAGE_HIDE_PIN';

                    notificationDialogService.showDialog(message, () => { });
                });
            })
    }

    function getEffectiveGroupForUser() {

        var promise = new Promise<string>(resolve => {

            //If new, get from client-side form value (group roles grid).
            //If editing, get the relevant groupId from the backend.
            //(This is because we don't load all group roles to client side.)

            if (formProps.isNew) {
                const selector = formValueSelector(formProps.form);
                const formState = store.getState();
                var groupId = "*";

                var formValue = selector(formState, 'groupRoles');

                if (formValue != undefined) {
                    var selectedGroupIds = JSON.parse(selector(formState, 'groupRoles'));
                    if (selectedGroupIds.length == 1)
                        groupId = selectedGroupIds[0].groupId;
                }

                resolve(groupId);
            }
            else {
                const userId = formProps.item.id;
                userService.getEffectiveGroupForUser(userId)
                    .then((groupId: string) => {
                        resolve(groupId)
                    })
            }
        });

        return promise;
    }

    function activateUser() {
        userService.activateUser(formProps.item.id)
            .then(() => {
                formProps.reload();
                alertActions.showSuccess('TEXT_ACTIVATION_EMAIL_SENT');
            });
    }

    var canAddPIN = permissionService.canPermissionGrant('PIN');
    var canAcitvateUser = permissionService.canPermissionGrant('ACTIVATE');

    return <>
        {!formProps.isNew && !formProps.item.isEmailConfirmed &&
            <ActionButton isPermissionAllowed={canAcitvateUser} color="secondary" onClick={activateUser} disabled={formProps.dirty}
                textKey={formProps.item.isActivationEmailSent ? "BUTTON_REACTIVATE" : "BUTTON_ACTIVATE"} icon="fa-envelope" />}
        <ActionButton isPermissionAllowed={canAddPIN} textKey="BUTTON_PIN" onClick={showPINPopup} color="secondary" icon="fa-key" />
    </>
}

export default UserHeaderButton;