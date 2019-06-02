import * as React from 'react';
import { GridColumnProps } from '@progress/kendo-react-grid';
import { localise, contextService } from '../../../shared/services';
import { ChildItemGridProps, ChildItemGrid, ItemEditFormBodyComponent, ItemEditFormProps } from '../../../shared/components/ChildItemGrid';
import { UserGroupRole } from '../../types/dto';
import { FormField } from '../../../shared/components/Form';
import GroupList from '../../../shared/components/GroupList/GroupList';
import { LookupDropDown } from '../../../shared/components/LookupDropDown/LookupDropDown';
import { LookupTextCell, GroupNameCell } from '../../../shared/components/DataGrid';

export class UserGroupRoleEditGrid extends ChildItemGrid<UserGroupRole> {

    constructor(props: ChildItemGridProps<UserGroupRole>) {
        super(props);
        this.validateItem = this.validateItem.bind(this);
    }

    editFormBody: ItemEditFormBodyComponent = EditFormBody;

    getItemId(item: UserGroupRole) {
        return item.refId;
    }

    getNewItem(): UserGroupRole {
        return {
            refId: (new Date()).toISOString(),
            groupId: contextService.getDefaultSingleGroupId()
        };
    }

    validateItem(groupRole: UserGroupRole, props: ItemEditFormProps): {} {
        const items = this.props.items;

        if (items && groupRole.role) {
            const uniqueKey = groupRole.groupId + "-" + groupRole.role;
            const duplicate = items.find(i => i.refId != groupRole.refId && (i.groupId + "-" + i.role) == uniqueKey);
            if (duplicate)
                return { role: localise("ERROR_GROUPROLE_DUPLICATE_VALUE") }
        }

        return {};
    }

    getColumns(): GridColumnProps[] {
        return [
            { field: "groupId", title: localise('TEXT_GROUP'), cell: GroupNameCell() },
            { field: "role", title: localise('TEXT_ROLE'), cell: LookupTextCell("LIST_ROLES") }
        ]
    }
}

const EditFormBody = (formProps: ItemEditFormProps) => {

    function onGroupChange(event: any, p: any) {
        formProps.onSelectGroup(event.target.value);
        p.onChange(event);
        formProps.change("role", "");
    }

    const permissionSuffix = formProps.isParentItemNew ? "NEW" : "UPDATE";

    return <>
        <FormField name="groupId" labelKey="TEXT_GROUP" remarksKey="REMARK_ROLE_GROUP" required={true}
            component={(props: any) => {
                return <GroupList  {...props} onChange={(e: any) => onGroupChange(e, props)} permissionSuffix={permissionSuffix} />
            }} />
        <FormField name="role" required={true} remarksKey="REMARK_ROLE_ROLE" labelKey="TEXT_ROLE"
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_ROLES" groupId={formProps.selectedGroup || (formProps.initialValues as any).groupId} />} />
    </>
}