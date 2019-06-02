import * as React from 'react';
import { Input } from 'reactstrap';
import { Group } from '../../types/dto';
import { DetailPage, DetailFormBodyComponent, DetailPageContainer } from '../../../shared/components/DetailPage';
import { FormField, FormAuditField } from '../../../shared/components/Form';
import { MobileNumberInput, mobileNumberRequiredFieldValidator } from "../../../shared/components/MobileNumberInput/MobileNumberInput";
import { localise, groupService, contextService } from "../../../shared/services";

class GroupDetails extends DetailPage<Group> {

    detailFormBody: DetailFormBodyComponent = FormBody;
    listPagePath: string = "/groups/groupmanagement";

    validateItem(): any {
        return {};
    }

    objectToFormValues(group: Group) {
        const values = { ...group, mobileNumber: JSON.stringify(group.mobileNumber) };
        return values;
    }

    formValuesToObject(values: any) {
        const group = { ...values, mobileNumber: JSON.parse(values.mobileNumber) };
        return group;
    }

    afterSave(id: string, group: Group, isNew: boolean) {       
        let groups = groupService.getGroupList();
        if (!isNew) {
            
            let item = groups.find(c => c.id == id);

            if (item)
                item.name = group.name;
            groupService.setGroupList(groups);
        }
        contextService.setSingleGroupId((groups.length == 1) ? groups[0].id : undefined);
        return true;
    }

    afterDelete(id: string) {
        let groups = groupService.getGroupList();
        let item = groups.find(c => c.id == id);
        
        if (item)
            groups.splice(groups.indexOf(item), 1);
        groupService.setGroupList(groups);
        contextService.setSingleGroupId((groups.length == 1) ? groups[0].id : undefined);        
        return true;
    }
}

const FormBody = (formProps: any) => {

    function validateEmail(value: string) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? localise("ERROR_INVALID_EMAIL_ADDRESS") : undefined;
    }

    return <>
        <FormField remarksKey="REMARK_GROUP_NAME" required={true} labelKey="TEXT_GROUP_NAME" name="name"
            component={Input} />
        <FormField remarksKey="REMARK_FIRST_NAME" required={true} labelKey="TEXT_FIRST_NAME" name="firstName"
            component={Input} />
        <FormField remarksKey="REMARK_LAST_NAME" required={true} labelKey="TEXT_LAST_NAME" name="lastName"
            component={Input} />
        <FormField remarksKey="REMARK_MOBILE_NUMBER" required={true} labelKey="TEXT_MOBILE_NUMBER" name="mobileNumber"
            component={MobileNumberInput} validate={mobileNumberRequiredFieldValidator} />
        <FormField remarksKey="REMARK_EMAIL" required={true} labelKey="TEXT_EMAIL" name="email"
            component={Input} validate={validateEmail} />
        <FormAuditField updatedOnUtc={formProps.item.updatedOnUtc} updatedByName={formProps.item.updatedByName} />
    </>
}

export default DetailPageContainer(GroupDetails, "GroupDetails", "group");
