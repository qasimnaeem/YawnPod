import * as React from 'react';
import { Input } from 'reactstrap';
import { User } from '../../types/dto';
import { DetailPage, DetailFormBodyComponent, DetailPageContainer } from '../../../shared/components/DetailPage';
import { FormField, FormAuditField, FormJsonField } from '../../../shared/components/Form';
import { LookupDropDown } from '../../../shared/components/LookupDropDown/LookupDropDown';
import { UserGroupRoleEditGrid } from './UserGroupRoleEditGrid';
import { DateTimePicker } from '@progress/kendo-dateinputs-react-wrapper';
import { DetailFormHeaderComponent, DetailFormProps } from 'src/modules/shared/components/DetailPage/DetailForm';
import HeaderButtons from './UserHeaderButton';
import { MobileNumberInput, mobileNumberRequiredFieldValidator } from "../../../shared/components/MobileNumberInput/MobileNumberInput";
import { contextService } from "../../../shared/services";
import { alertActions } from '../../../shared/actions/alert.actions';
import { NumericInput } from '../../../shared/components/NumericInput/NumericInput';
import { utilityService } from 'src/modules/shared/services/util.service';

class UserDetails extends DetailPage<User> {

    detailFormBody: DetailFormBodyComponent = FormBody;
    detailFormHeader: DetailFormHeaderComponent = HeaderButtons;
    listPagePath: string = "/users/usermanagement";

    validateItem(item: User): any {
        return {};
    }

    objectToFormValues(user: User) {
        user.groupRoles = user.groupRoles || [];
        user.groupRoles.forEach((cr, index) => {
            cr.refId = index.toString();
        });

        const values = { ...user, groupRoles: JSON.stringify(user.groupRoles), mobileNumber: JSON.stringify(user.mobileNumber) };
        return values;
    }

    formValuesToObject(values: any) {
        const user = { ...values, groupRoles: JSON.parse(values.groupRoles), mobileNumber: JSON.parse(values.mobileNumber) };
        return user;
    }

    beforeSave(item: User, isNew: boolean): boolean {

        if (isNew && (!item.groupRoles || item.groupRoles.length == 0)) {
            alertActions.showError("ERROR_USER_NO_ROLES_SPECIFIED");
            return false;
        }

        //Set the context group using the first role assignment.
        let groupId = item.groupRoles && item.groupRoles.length > 0 && item.groupRoles[0].groupId;
        if (groupId)
            contextService.setCurrentGroup(groupId)

        return true;
    }
}

const FormBody = (formProps: DetailFormProps) => {

    function onDateChange(event: any, p: any) {
        let e = {
            target: {
                value: event.sender.value(),
                name: p.name
            }
        }
        p.onChange(e);
    }

    return <>
        <FormField name="culture" required={true} remarksKey="REMARK_USER_CULTURE" labelKey="TEXT_CULTURE"
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_CULTURE" />} />
        <FormField name="timeZone" required={true} remarksKey="REMARK_TIMEZONE" labelKey="TEXT_TIMEZONE"
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_TIMEZONE" />} />
        <FormField remarksKey="REMARK_FIRST_NAME" required={true} labelKey="TEXT_FIRST_NAME" name="firstName"
            component={Input} />
        <FormField remarksKey="REMARK_LAST_NAME" required={true} labelKey="TEXT_LAST_NAME" name="lastName"
            component={Input} />
        <FormField remarksKey="REMARK_MOBILE_NUMBER" required={true} labelKey="TEXT_MOBILE_NUMBER" name="mobileNumber"
            component={MobileNumberInput} validate={mobileNumberRequiredFieldValidator} />
        <FormField remarksKey="REMARK_EMAIL" required={true} labelKey="TEXT_EMAIL" name="email"
            component={Input} validate={utilityService.validateEmail} />
        <FormField remarksKey="REMARK_ALTERNATE_ID" required={true} labelKey="TEXT_ALTERNATE_ID" name="alternateId"
            component={NumericInput} />
        <FormField remarksKey="REMARK_ACCESS_EXPIRES_ON" labelKey="TEXT_ACCESS_EXPIRES_ON" name="accessExpiryDate"
            component={(props: any) =>
                <div>
                    <DateTimePicker {...props} change={(e: any) => onDateChange(e, props)}
                        value={formProps.isNew || props.value == '' ? props.value : new Date(props.value)} />
                </div>
            } />
        <FormAuditField updatedOnUtc={formProps.item.updatedOnUtc} updatedByName={formProps.item.updatedByName} />
        <FormJsonField name="groupRoles" valueProp="items" changeProp="onChange"
            defaultSort={{ field: "groupId", dir: "asc" }} component={(props: any) =>
                <UserGroupRoleEditGrid {...props} name="userGroupRoles" parentFormName={formProps.form}
                    newButtonLabelKey="BUTTON_NEW_ROLE" isParentItemNew={formProps.isNew} />} />
        </>
}

export default DetailPageContainer(UserDetails, "UserDetails", "user");
