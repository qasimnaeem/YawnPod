import * as React from 'react';
import { Lookup } from '../../types/dto';
import { DetailPage, DetailFormBodyComponent, DetailPageContainer } from '../../../shared/components/DetailPage';
import { FormField, FormAuditField, FormJsonField } from '../../../shared/components/Form';
import { LookupDropDown } from '../../../shared/components/LookupDropDown/LookupDropDown';
import GroupList from '../../../shared/components/GroupList/GroupList';
import { LookupItemEditGrid } from './LookupItemEditGrid';
import { contextService } from '../../../shared/services';
import { IncludeInPodCheckBox } from '../shared/IncludeInPodCheckBox';

class LookupDetails extends DetailPage<Lookup> {

    detailFormBody: DetailFormBodyComponent = FormBody;
    listPagePath: string = "/configuration/lookupmanagement";

    validateItem(item: Lookup): any {
        return {};
    }

    objectToFormValues(lookup: Lookup) {
        lookup.items = lookup.items || [];
        const values = { ...lookup, items: JSON.stringify(lookup.items) };
        return values;
    }

    formValuesToObject(values: any) {
        const lookup = { ...values, items: JSON.parse(values.items) };
        return lookup;
    }
}

const FormBody = (formProps: any) => {
    function onGroupChange(event: any, inputProps: any) {
        formProps.onSelectGroup(event.target.value);
        inputProps.onChange(event);
    }

    return <>
        <FormField name="groupId" labelKey="TEXT_GROUP" remarksKey="REMARK_GROUP" required={true}
            disabled={!formProps.isNew}
            component={(props: any) =>
                <GroupList {...props} onChange={(e: any) => onGroupChange(e, props)} permissionSuffix={formProps.isNew ? "NEW" : "UPDATE"} />} />
        <FormField name="culture" labelKey="TEXT_CULTURE" remarksKey="REMARK_CULTURE" required={true}
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_CULTURE" />} />
        <FormField name="section" labelKey="TEXT_SECTION" remarksKey="REMARK_SECTION" required={true}
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_SECTION" />} />
        <FormField name="key" labelKey="TEXT_KEY" remarksKey="REMARK_KEY" required={true}
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_LOOKUPKEYS" />} />
        <FormField name="includeInPod" remarksKey="REMARK_INCLUDE_IN_POD" component={IncludeInPodCheckBox} />
        <FormAuditField updatedOnUtc={formProps.item.updatedOnUtc} updatedByName={formProps.item.updatedByName} />
        <FormJsonField name="items" groupId={formProps.selectedGroupId || formProps.initialValues.groupId}
            parentFormName={formProps.form} deletePermissionKeySuffix="DELETEKEY" addPermissionKeySuffix="ADDKEY"
            valueProp="items" changeProp="onChange" component={LookupItemEditGrid} defaultSort={{ field: "text", dir: "asc" }} />
    </>
}

export default DetailPageContainer(LookupDetails, "LookupDetails", "lookups", () => {
    //Code to return a new empty object.
    return { id: "", groupId: contextService.getDefaultSingleGroupId() }
});
