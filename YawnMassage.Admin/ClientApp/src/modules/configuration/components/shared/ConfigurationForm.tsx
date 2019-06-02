import * as React from 'react';
import { Input } from 'reactstrap';
import { FormField, FormAuditField } from "../../../shared/components/Form";
import GroupList from '../../../shared/components/GroupList/GroupList';
import { LookupDropDown } from '../../../shared/components/LookupDropDown/LookupDropDown';
import { DetailFormProps } from '../../../shared/components/DetailPage';
import { IncludeInPodCheckBox } from './IncludeInPodCheckBox';

interface Props extends DetailFormProps {
    configurationLookupKey: string;
}

export const ConfigurationForm = (formProps: Props) => {

    function onGroupChange(event: any, inputProps: any) {
        formProps.onSelectGroup(event.target.value);
        inputProps.onChange(event);
    }

    return <>
        <FormField name="groupId" required={true} remarksKey="REMARK_GROUP" labelKey="TEXT_GROUP"
            disabled={!formProps.isNew}
            component={(props: any) =>
                <GroupList {...props} onChange={(e: any) => onGroupChange(e, props)} permissionSuffix={formProps.isNew ? "NEW" : "UPDATE"} />} />
        <FormField name="culture" required={true} remarksKey="REMARK_CULTURE" labelKey="TEXT_CULTURE"
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_CULTURE" />} />
        <FormField name="section" remarksKey="REMARK_SECTION" required={true} labelKey="TEXT_SECTION"
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_SECTION" />} />
        <FormField name="key" remarksKey="REMARK_KEY" required={true} labelKey="TEXT_KEY"
            component={(props: any) => <LookupDropDown {...props} lookupKey={formProps.configurationLookupKey} />} />
        <FormField remarksKey="REMARK_VALUE" required={true} labelKey="TEXT_VALUE" name="value"
            component={Input} />
        <FormField remarksKey="REMARK_TEMPLATE_REMARK" labelKey="TEXT_REMARK" name="remark"
            component={Input} />
        <FormField name="includeInPod" remarksKey="REMARK_INCLUDE_IN_POD" component={IncludeInPodCheckBox} />
        <FormAuditField updatedOnUtc={formProps.item.updatedOnUtc} updatedByName={formProps.item.updatedByName} />
        </>
}