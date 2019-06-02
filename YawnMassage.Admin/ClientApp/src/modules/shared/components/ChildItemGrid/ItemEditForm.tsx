import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { BackButton, SaveButton, DeleteButton } from '../ActionButtons/ActionButtons';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { globalDirtyService, localise } from '../../services';

interface ItemEditProps {
    isNew?: boolean;
    isParentItemNew: boolean;
    canDelete?: boolean;
    onBackClick?: () => void;
    onDeleteClick?: () => void;
    onSelectGroup: (groupId: string) => void;
    selectedGroup?: string;
}

export type ItemEditFormProps = ItemEditProps & InjectedFormProps<{}, ItemEditProps>;
export type ItemEditFormBodyComponent = (props: ItemEditFormProps) => any;

const ItemEditFormGenerator = (formBodyComponent: ItemEditFormBodyComponent) =>
    (props: ItemEditFormProps) => {
        const FormBody = formBodyComponent;
        return (
            <>
                <Row>
                    <Col>
                        <BackButton onClick={() => editFormBackClick(props)} />
                        <SaveButton onClick={props.handleSubmit} disabled={!props.dirty} />
                    </Col>
                    <Col md="auto">
                        {props.canDelete && <DeleteButton onClick={props.onDeleteClick} disabled={props.isNew} />}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                    </Col>
                    <Col md="auto">
                        <small className="text-muted"> {localise('TEXT_REQUIRED_FIELD')} </small>
                    </Col>
                </Row>
                <FormBody {...props} />
            </>
        )
    }

const editFormBackClick = (props: ItemEditFormProps) => {

    const backClick = props.onBackClick;

    if (backClick) {
        if (props.dirty) {
            globalDirtyService.showDirtyConfirmation(() => backClick())
            return;
        }
        backClick();
    }
}


export const ItemEditForm = (name: string, formBodyComponent: ItemEditFormBodyComponent, validator?: (item: any, props: ItemEditFormProps) => {}) => {

    const formWithBody = ItemEditFormGenerator(formBodyComponent);
    const reduxFormGenerator = reduxForm<{}, ItemEditProps>({ form: name, validate: validator })

    return reduxFormGenerator(formWithBody);
}
