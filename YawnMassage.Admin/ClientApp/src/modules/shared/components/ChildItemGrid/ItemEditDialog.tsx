import * as React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { ItemEditForm, ItemEditFormBodyComponent, ItemEditFormProps } from './ItemEditForm';

interface Props<T> {
    name: string;
    item?: T;
    isNew?: boolean;
    isParentItemNew: boolean; //Whether the parent page item is new.
    canDelete?:boolean;
    bodyComponent: ItemEditFormBodyComponent;
    validateItem?: (item: T, props: ItemEditFormProps) => {};
    onClose?: () => void;
    onSave?: (item: T) => void;
    onDelete?: (item: T) => void;
}

interface State {
    selectedGroup?: string;
}

export class ItemEditDialog<T> extends React.Component<Props<T>, State> {
    constructor(props: Props<T>) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.groupSelected = this.groupSelected.bind(this);
        this.state = {
        }
    }

    editForm = ItemEditForm(this.props.name, this.props.bodyComponent, this.props.validateItem);

    onDelete() {
        const { props } = this;
        props.onDelete && props.item && props.onDelete(props.item);
    }

    groupSelected(groupId: any) {
        this.setState({ selectedGroup: groupId });
    }

    render() {
        const EditForm = this.editForm;
        const { props } = this;

        return (
            <Dialog width={600}>
                <EditForm selectedGroup={this.state.selectedGroup} onSelectGroup={this.groupSelected} initialValues={props.item} canDelete={props.canDelete} enableReinitialize={true}
                    isNew={props.isNew} isParentItemNew={props.isParentItemNew}
                    onSubmit={props.onSave} onDeleteClick={this.onDelete} onBackClick={props.onClose} />
            </Dialog>
        )
    }
}
