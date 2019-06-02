import * as React from 'react';
import { GridColumnProps } from '@progress/kendo-react-grid';
import { localise, lookupService } from '../../../shared/services';
import { ChildItemGridProps, ChildItemGrid, ItemEditFormBodyComponent, ItemEditFormProps } from '../../../shared/components/ChildItemGrid';

import { FormField } from '../../../shared/components/Form';
import { PermissionGridItem } from '../../types/dto';
import { LookupDropDown } from '../../../shared/components/LookupDropDown/LookupDropDown';

export class PermissionItemEditGrid extends ChildItemGrid<PermissionGridItem> {

    constructor(props: ChildItemGridProps<PermissionGridItem>) {
        super(props);
        this.validateItem = this.validateItem.bind(this);
    }

    editFormBody: ItemEditFormBodyComponent = EditFormBody;

    getItemId(item: PermissionGridItem) {
        return item.value;
    }

    getNewItem(): PermissionGridItem {
        return {};
    }

    onSavingItem(isNew: boolean, item: PermissionGridItem): PermissionGridItem {        
        if(isNew) {
            item.remark = lookupService.getRemark('LIST_PERMISSIONS',  item.value || '');
        }
        return item;
    }

    validateItem(item: PermissionGridItem, props: ItemEditFormProps): {} {
        const items = this.props.items;

        if (props.isNew && items && item.value) {
            const newItemValue = item.value;
            const duplicate = items.find(i => i.value != undefined && i.value.toUpperCase() == newItemValue.toUpperCase());
            if (duplicate)
                return { value: localise("ERROR_PERMISSION_DUPLICATE_VALUE") }
        }

        return {};
    }

    getColumns(): GridColumnProps[] {
        return [
            { field: "value", title: localise('TEXT_PERMISSION') },
            { field: "remark", title: localise('TEXT_REMARK') }
        ]
    }
}

const EditFormBody = (props: ItemEditFormProps) =>
    <>
        <FormField name="value" labelKey="TEXT_PERMISSION" remarksKey="REMARK_PERMISSION_OPTION_VALUE" required={true} disabled={!props.isNew} 
            component={(props: any) => <LookupDropDown {...props} lookupKey="LIST_PERMISSIONS" />} />
    </>