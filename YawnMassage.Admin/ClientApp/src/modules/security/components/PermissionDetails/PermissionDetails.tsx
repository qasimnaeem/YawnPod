import * as React from 'react';
import { PermissionConfig, PermissionGridItem } from '../../types/dto';
import { DetailPage, DetailFormBodyComponent, DetailPageContainer } from '../../../shared/components/DetailPage';
import { FormField, FormAuditField, FormJsonField } from '../../../shared/components/Form';
import GroupList from '../../../shared/components/GroupList/GroupList';
import { PermissionItemEditGrid } from './PermissionItemEditGrid';
import { lookupService, contextService } from '../../../shared/services';
import { RoleDropDown } from '../RoleDropDown/RoleDropDown';

class PermissionDetails extends DetailPage<PermissionConfig> {

    detailFormBody: DetailFormBodyComponent = FormBody;
    listPagePath: string = "/security/permissionmanagement";

    validateItem(item: PermissionConfig): any {
        return {};
    }

    objectToFormValues(permission: PermissionConfig) {

        permission.permissions = permission.permissions || [];
        var gridItems = permission.permissions.map(
            (value: string) => {
                let remark = lookupService.getRemark('LIST_PERMISSIONS', value);
                return { value, remark }
            });

        const values = { ...permission, permissions: JSON.stringify(gridItems) };

        return values;
    }

    formValuesToObject(values: any) {

        var permissions = (JSON.parse(values.permissions) as PermissionGridItem[]).map((permission: PermissionGridItem) => permission.value);

        const permission = { ...values, permissions };

        return permission;
    }
}

const FormBody = (formProps: any) => {
    function onGroupChange(event: any, inputProps: any) {
        formProps.onSelectGroup(event.target.value);
        inputProps.onChange(event);
        formProps.change("role", "");
    }

    return <>
        <FormField name="groupId" required={true} remarksKey="REMARK_GROUP" labelKey="TEXT_GROUP"
            disabled={!formProps.isNew}
            component={(props: any) =>
                <GroupList {...props} onChange={(e: any) => onGroupChange(e, props)} permissionSuffix={formProps.isNew ? "NEW" : "UPDATE"} />} />

        <FormField name="role" labelKey="TEXT_ROLE" remarksKey="REMARK_ROLE" required={true}
            component={(props: any) => <RoleDropDown {...props} groupId={formProps.selectedGroupId || formProps.initialValues.groupId} />} />

        <FormAuditField updatedOnUtc={formProps.item.updatedOnUtc} updatedByName={formProps.item.updatedByName} />

        <FormJsonField groupId={formProps.selectedGroupId || formProps.initialValues.groupId} 
            parentFormName={formProps.form} name="permissions" valueProp="items" changeProp="onChange"
            deletePermissionKeySuffix="DELETEKEY" addPermissionKeySuffix="ADDKEY" defaultSort={{ field: "value", dir: "asc" }}            
            component={PermissionItemEditGrid} />
    </>
}

export default DetailPageContainer(PermissionDetails, "PermissionDetails", "permissions", () => {
    //Code to return a new empty object.
    return { id: "", groupId: contextService.getDefaultSingleGroupId()}
});

