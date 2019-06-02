import * as React from "react";
import { Button, ButtonProps, Row, Col } from "reactstrap";

import "./action-button.css";
import { localise } from "../../services";
import { permissionService } from "../../services/permission.service";

interface BaseButtonProps extends ButtonProps {
}

interface NewButtonProps extends BaseButtonProps {
    permissionKeySuffix?: string;
    considerContextGroup?: boolean;
    labelKey?: string;
}

export const NewButton = (props: NewButtonProps) => {
    const { permissionKeySuffix, considerContextGroup, labelKey, ...rest } = props;

    var action = permissionKeySuffix == undefined ? 'NEW' : permissionKeySuffix;
    var canAddNew = (considerContextGroup) ? 
        permissionService.isActionPermittedForGroup(action) : 
        permissionService.canPermissionGrant(action);  

    return <ActionButton textKey={labelKey || "BUTTON_NEW"} isPermissionAllowed={canAddNew} color="secondary" icon="fa-plus" {...rest} />
}

export const BackButton = (props: BaseButtonProps) => {
    return <ActionButton textKey="BUTTON_BACK" color="danger" icon="fa-chevron-circle-left" {...props} />
}

export const SaveButton = (props: BaseButtonProps) => {
    return <ActionButton textKey="BUTTON_SAVE" color="primary" icon="fa-save" {...props} />
}
export const DeleteButton = (props: BaseButtonProps) => {
    return <ActionButton textKey="BUTTON_DELETE" color="secondary" icon="fa-trash-alt" {...props} />
}

export const BulkDeleteButton = (props: BaseButtonProps) => {
    return <ActionButton textKey="BUTTON_BULKDELETE" color="secondary" icon="fa-trash-alt" {...props} />
}

export const YesButton = (props: BaseButtonProps) => {
    return <ActionButton textKey="BUTTON_YES" color="primary" icon="fa-check" className="short" {...props} />
}

export const NoButton = (props: BaseButtonProps) => {
    return <ActionButton textKey="BUTTON_NO" color="secondary" icon="fa-times" className="short" {...props} />
}

export const OKButton = (props: BaseButtonProps) => {
    return <ActionButton textKey="BUTTON_OK" color="primary" icon="fa-check" className="short" {...props} />
}

interface ActionButtonProps extends ButtonProps {
    textKey: string;
    icon?: string;
    isPermissionAllowed?: any;
    disableDefaultMargin?: boolean;
}

export const ActionButton = (props: ActionButtonProps) => {
    let { textKey, icon, className, disableDefaultMargin, isPermissionAllowed, ...buttonProps } = props;

    const margin = disableDefaultMargin ? "" : "m-1";

    if (isPermissionAllowed == undefined || isPermissionAllowed) {
        return (<Button {...buttonProps as any} className={`${margin} action-button ${className}`}>
            {icon ?
                <Row>
                    <Col xs="auto"><i className={`fas ${icon} pr-0`} /></Col>
                    <Col className="pl-0">{localise(props.textKey)}</Col>
                </Row> :
                localise(props.textKey)}
        </Button>);
    }
    else {
        return null;
    }
}
