import * as React from 'react';
import { GridColumnProps } from '@progress/kendo-react-grid';
import { Input } from 'reactstrap';
import { localise } from '../../../shared/services';
import { ChildItemGridProps, ChildItemGrid, ItemEditFormBodyComponent, ItemEditFormProps } from '../../../shared/components/ChildItemGrid';
import { FormField } from '../../../shared/components/Form';
import { LookupItem } from '../../../shared/types/dto';
import { NumericInput } from '../../../shared/components/NumericInput/NumericInput';
import { LookupDropDown } from 'src/modules/shared/components/LookupDropDown/LookupDropDown';
import { formValueSelector } from 'redux-form';
import { store } from 'src/redux/store';

export class LookupItemEditGrid extends ChildItemGrid<LookupItem> {

    constructor(props: ChildItemGridProps<LookupItem>) {
        super(props);
        this.validateItem = this.validateItem.bind(this);
    }

    editFormBody: ItemEditFormBodyComponent = EditFormBody;

    getItemId(item: LookupItem) {
        return item.value;
    }

    getNewItem(): LookupItem {
        return {};
    }

    onSavingItem(isNew: boolean, item: LookupItem) {
        //Since we are using a textbox for sortOrder, we receive a string at runtime.
        //We need to convert it to an integer before saving.
        item.sortOrder = parseInt(item.sortOrder as any);
        return item;
    }

    validateItem(item: LookupItem, props: ItemEditFormProps): {} {
        const items = this.props.items;

        if (props.isNew && items && item.value) {
            const newItemValue = item.value;
            const duplicate = items.find(i => i.value != undefined && i.value.toUpperCase() == newItemValue.toUpperCase());
            if (duplicate)
                return { value: localise("ERROR_LOOKUPITEM_DUPLICATE_VALUE") }
        }

        return {};
    }

    getColumns(): GridColumnProps[] {
        return [
            { field: "text", title: localise('TEXT_TEXT') },
            { field: "value", title: localise('TEXT_VALUE') },
            { field: "sortOrder", title: localise('TEXT_SORTORDER'), width: 120 }
        ]
    }
}

const EditFormBody = (formProps: ItemEditFormProps) => {

    const selector = formValueSelector('LookupDetailsForm');
    const formState = store.getState();
    let parentLookupKey = selector(formState, "key");

    return <>
        <FormField name="value" labelKey="TEXT_VALUE" remarksKey="REMARK_LOOKUP_OPTION_VALUE"
            required={true} disabled={!formProps.isNew} component={KeyInput} />
        <FormField name="text" labelKey="TEXT_TEXT" remarksKey="REMARK_LOOKUP_OPTION_TEXT"
            required={true} component={Input} />
        <FormField name="remark" labelKey="TEXT_REMARK" remarksKey="REMARK_LOOKUP_OPTION_REMARK"
            required={true} component={Input} />
        <FormField name="childLookupKey" labelKey="TEXT_OTHER_LOOKUP_REFERENCE" remarksKey="REMARK_OTHER_LOOKUP_REFERENCE"
            component={(props: any) => <LookupDropDown {...props} parentLookupKey={parentLookupKey} lookupKey="LIST_LOOKUPKEYS" />} />
        <FormField name="sortOrder" labelKey="TEXT_SORTORDER" remarksKey="REMARK_LOOKUP_OPTION_SORTORDER"
            component={NumericInput} />
    </>
}

const KeyInput = (props: any) =>
    <Input {...props} onBlur={(e) => {
        e.target.value = e.target.value.toUpperCase();
        props.onBlur(e);
    }} />