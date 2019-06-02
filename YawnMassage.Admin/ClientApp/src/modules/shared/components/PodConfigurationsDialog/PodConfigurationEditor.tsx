import * as React from 'react';
import { Row, Col, Input } from 'reactstrap';
import { LookupDropDown } from '../LookupDropDown/LookupDropDown';
import { confirmDialogService, lookupService, permissionService } from '../../services';
import "./pod-configurations-editor-form.css"
import { PodConfiguration } from '../../types/dto';

interface Props {
    configuration: PodConfiguration;
    onChange?: (configuration?: PodConfiguration) => void;
    onDelete?: (configuration?: PodConfiguration) => void;
    isPodItemsMode?: boolean;
    lookupKey: string;
}

export class PodConfigurationEditor extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        this.onKeyChange = this.onKeyChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onKeyChange(e: any) {
        const { configuration, onChange } = this.props;
        let entry: PodConfiguration = { index: configuration.index, key: e.target.value, value: configuration && configuration.value };
        onChange && onChange(entry);
    }

    onValueChange(e: any) {
        const { configuration, onChange } = this.props;
        let entry: PodConfiguration = { index: configuration.index, key: configuration && configuration.key, value: e.target.value };
        onChange && onChange(entry);
    }

    onDeleteClick() {
        let { configuration, onDelete } = this.props;

        confirmDialogService.showDialog("CONFIRMATION_DELETE",
            () => {
                if (onDelete)
                    onDelete(configuration);
            })
    }

    render() {
        const { configuration, isPodItemsMode, lookupKey } = this.props;
        const canDelete = (isPodItemsMode && permissionService.isActionPermittedForGroup("ITEM_CONFIGURATION"))
            || (!isPodItemsMode && permissionService.isActionPermittedForGroup("CONFIGURATION_DELETE"));
        const canEdit = (isPodItemsMode && permissionService.isActionPermittedForGroup("ITEM_CONFIGURATION"))
            || (!isPodItemsMode && permissionService.isActionPermittedForGroup("CONFIGURATION_EDIT"));

        return (
            <>
                <Row className="configuration-entry-row">
                    <Col className="key-entry-row" xs={6}>
                        <LookupDropDown name="key" lookupKey={lookupKey} value={(configuration && configuration.key) || ""}
                            onChange={this.onKeyChange} disabled={!canEdit} />
                    </Col>
                    <Col xs={4}>
                        <Input name="value" value={(configuration && configuration.value) || ""}
                            placeholder={configuration && configuration.inheritedValue} onChange={this.onValueChange} disabled={!canEdit} />
                    </Col>
                    {
                        canDelete
                        &&
                        <Col className="delete-icon-row" xs={1}>
                            <span onClick={this.onDeleteClick}>
                                <i className="fa fa-times text-danger delete-icon" aria-hidden="true"></i>
                            </span>
                        </Col>
                    }
                </Row>
                <Row>
                    <Col className="remark-error-row">
                        {configuration.error
                            &&
                            <small className="text-danger">{configuration.error}</small>
                            ||
                            <small className="text-muted"> {configuration.key && lookupService.getRemark(lookupKey, configuration.key)} </small>
                        }
                    </Col>
                </Row>
            </>
        );
    }
}
