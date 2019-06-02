import * as React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { InjectedFormProps } from "redux-form";
import { BackButton, SaveButton, DeleteButton } from "../ActionButtons/ActionButtons";
import { FormDescriptionHeader } from "../Form";
import { permissionService } from "../../services/permission.service";

export interface DetailFormCustomProps {
    item: any;
    body?: any;
    header?: DetailFormHeaderComponent;
    onBackClick?: () => void;
    onDeleteClick?: () => void;
    isNew: boolean;
    onSelectGroup: (groupId: string) => void;
    selectedGroupId?: string;
    reload: () => void;
    readonly?: boolean;
}

export type DetailFormProps = DetailFormCustomProps & InjectedFormProps<{}, DetailFormCustomProps>
export type DetailFormBodyComponent = any;
export type DetailFormHeaderComponent = any;

export const DetailForm =
    (props: DetailFormProps) => {
        const BodyComponent = props.body;
        const HeaderComponent = props.header;
        const canDelete = permissionService.isActionPermittedForGroup("DELETE", props.item.groupId)
        return (
            <>
                <Card className="page-fixed-content compact">
                    <CardBody>
                        <Row>
                            <Col>
                                <BackButton onClick={props.onBackClick} />
                                {!props.readonly && <SaveButton onClick={props.handleSubmit} disabled={!props.dirty} />}
                            </Col>
                            <Col xs="auto">
                                {HeaderComponent && <HeaderComponent {...props} />}
                                {!props.readonly && canDelete && <DeleteButton onClick={props.onDeleteClick} disabled={props.isNew} />}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="page-fill-content content-scroll">
                    <CardBody>
                        <FormDescriptionHeader />
                        {BodyComponent && <BodyComponent {...props} />}
                    </CardBody>
                </Card>
            </>
        )
    }