import * as React from 'react';
import { DetailPage, DetailFormBodyComponent, DetailPageContainer } from '../../../shared/components/DetailPage';
import { Pod } from '../../types/dto';
import { DetailFormHeaderComponent, DetailFormProps } from '../../../shared/components/DetailPage/DetailForm';
import PodHeaderButtons from './PodHeaderButtons';
import { FormField, FormAuditField } from '../../../shared/components/Form';
import { LookupDropDown } from '../../../shared/components/LookupDropDown/LookupDropDown';
import Input from 'reactstrap/lib/Input';
import GroupList from '../../../shared/components/GroupList/GroupList';
import { CountryList, CountryStateList } from '../../../shared/components/CountryLocationList';
import { contextService } from '../../../shared/services';

class PodDetails extends DetailPage<Pod>{

    detailFormBody: DetailFormBodyComponent = FormBody;
    detailFormHeader: DetailFormHeaderComponent = PodHeaderButtons;
    listPagePath: string = "/pod/podmanagement";

    validateItem(item: Pod) {
        return {};
    }

    objectToFormValues(pod: Pod): any {
        if (pod.items == undefined)
            pod.items = [];

        if (pod.configurations == undefined)
            pod.configurations = [];

        return { ...pod, items: JSON.stringify(pod.items), configurations: JSON.stringify(pod.configurations) };
    }

    formValuesToObject(values: any): Pod {
        return { ...values, items: JSON.parse(values.items), configurations: JSON.parse(values.configurations) };
    }

    beforeSave(pod: Pod, isNew: boolean): boolean {
        if (isNew) {
            pod.items = [];
            let itemCount = parseInt(pod.itemCount);

            for (let i = 1; i <= itemCount; i++) {
                pod.items.push({ number: i, name: "", type: "", hardwareId: "" });
            }
        }        
        return true;
    }
}

interface LocalState {
    country?: string;
}

class FormBody extends React.Component<DetailFormProps, LocalState> {

    constructor(props: DetailFormProps) {
        super(props);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.state = {
        }
    }

    onGroupChange(event: any, inputProps: any) {
        const { props: formProps } = this;
        formProps.onSelectGroup(event.target.value);
        inputProps.onChange(event);
        formProps.change("area", "");
        formProps.change("groupId", "");
    }

    onCountryChange(event: any, inputProps: any) {
        const { props: formProps } = this;
        this.setState({ country: event.target.value });
        inputProps.onChange(event);
        formProps.change("state", "");
    }    

    render() {
        const { props: formProps } = this;
        return <>
            <FormField name="groupId" required={true} remarksKey="REMARK_GROUP" labelKey="TEXT_GROUP"
                disabled={!formProps.isNew}
                component={(props: any) =>
                    <GroupList {...props} hideAllOption={true} allowAny={false} onChange={(e: any) => this.onGroupChange(e, props)}
                        permissionSuffix={formProps.isNew ? "NEW" : "UPDATE"} />} />
            <FormField remarksKey="REMARK_POD_NAME" required={true} labelKey="TEXT_POD_NAME" name="name"
                component={Input} />
            {!formProps.isNew && <FormField remarksKey="REMARK_PROVISIONING_KEY" labelKey="TEXT_PROVISIONING_KEY"
                name="provisioningKey" disabled component={ProvisioningKeyLabel} />}

            <FormField name="itemCount" disabled={!formProps.isNew} required={true} remarksKey="REMARK_ITEM_COUNT" labelKey="TEXT_ITEM_COUNT"
                component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_POD_ITEMCOUNTS" />} />
            <FormField name="country" required={true} remarksKey="REMARK_COUNTRY" labelKey="TEXT_COUNTRY"
                component={(props: any) => <CountryList {...props} allowAny={false} onChange={(e: any) => this.onCountryChange(e, props)} />} />
            <FormField name="state" required={true} remarksKey="REMARK_STATE" labelKey="TEXT_STATE"
                component={(props: any) => <CountryStateList {...props} disabled={false}
                    selectedCountry={this.state.country || formProps.item.country} />} />
            <FormField name="area" required={true} remarksKey="REMARK_AREA" labelKey="TEXT_AREA"
                component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_AREAS"
                    groupId={formProps.selectedGroupId || formProps.item.groupId} />} />
            <FormAuditField updatedOnUtc={formProps.item.updatedOnUtc} updatedByName={formProps.item.updatedByName} />
        </>
    }
}

const ProvisioningKeyLabel = (fieldProps: any) =>
    <div>
        <span className="lead badge badge-secondary font-weight-normal">{fieldProps.value}</span>
    </div>

export default DetailPageContainer(PodDetails, 'PodDetails', 'pod', () => {
    //Code to return a new empty object.
    return { id: "", groupId: contextService.getDefaultSingleGroupId(false) }
});