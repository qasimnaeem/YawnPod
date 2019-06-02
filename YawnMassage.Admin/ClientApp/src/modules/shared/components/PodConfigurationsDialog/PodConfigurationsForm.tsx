import * as React from "react";
import { Row, Col } from 'reactstrap';
import { BackButton, SaveButton, NewButton } from "../ActionButtons/ActionButtons";
import { localise, globalDirtyService, permissionService } from "../../services";
import { PodConfigurationEditor } from "./PodConfigurationEditor";
import "./pod-configurations-editor-form.css"
import { PodConfiguration } from "../../types/dto";

interface Props {
    configurations: PodConfiguration[];
    onBackClick?: () => void;
    onSave?: (configurations: PodConfiguration[]) => void;
    isNew?: boolean;
    title?: string;
    description?: string;
    duplicateErrorMsg?: string;
    invalidErrorMsg?: string;
    lookupkey: string;
    podGroup?: string;
}

interface State {
    configurations: PodConfiguration[];
    isDirty?: boolean;
    hasIncompleteEntries?: boolean;
    inheritedConfigurations?: PodConfiguration[];
}

const isStringEmpty = (str: string | undefined) => {
    return (str == undefined) || str.trim().length == 0;
}

export class PodConfigurationsForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onBack = this.onBack.bind(this);
        this.onNewClick = this.onNewClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.dirtyPageHandler = this.dirtyPageHandler.bind(this);

        this.state = {
            configurations: this.props.configurations.map((c, i) => {
                return {...c, index: i}
            })
        }

        window.onbeforeunload = this.dirtyPageHandler;
    }


    dirtyPageHandler(e: any) {
        if(this.state.isDirty) {
          e.returnValue = "";
          return "";
        }
        return;
    }

    onBack() {
        const { onBackClick } = this.props;
        if (onBackClick) {
            if (this.state.isDirty) {
                globalDirtyService.showDirtyConfirmation(() => onBackClick())
                return;
            }
            onBackClick();
        }
    }

    onNewClick() {
        let configurations = this.state.configurations;
        configurations.push({ index: configurations.length , key: "", value: "", error: undefined });

        this.setState({
            ...this.state,
            isDirty: true,
            hasIncompleteEntries: true,
            configurations: configurations
        });
    }
    
    onDelete(configuration: PodConfiguration) {
        let configurations = this.state.configurations;
        configurations.splice(configurations.indexOf(configuration), 1);
        configurations.forEach(c => {
            if (c.index > configuration.index)
                c.index--;
        });

        this.setState({
            ...this.state,
            isDirty: this.checkDirtyData(configurations),
            hasIncompleteEntries: this.checkIncompleteEntries(configurations),
            configurations: this.validateConfigurations(configurations)
        });
    }

    onChange(configuration: PodConfiguration) {
        let configurations = this.state.configurations;
        let existingEntry = configurations.find(c => c.index == configuration.index);
        let initialKey = existingEntry && existingEntry.key;
        
        if (existingEntry) {
            existingEntry.key = configuration.key;
            existingEntry.value = configuration.value;
            let inheritedConfig = this.state.inheritedConfigurations && this.state.inheritedConfigurations.find(c => c.key == configuration.key);
            existingEntry.inheritedValue = inheritedConfig && inheritedConfig.value;
        }

        configurations = this.validateConfigurations(configurations, true);

        if (existingEntry && !initialKey && existingEntry.error == this.props.invalidErrorMsg) {
            existingEntry.error = undefined;
        }
        
        this.setState({
            ...this.state,
            isDirty: this.checkDirtyData(configurations),
            hasIncompleteEntries: this.checkIncompleteEntries(configurations),
            configurations: configurations
        });
    }

    onSaveClick() {
        let configurations = this.validateConfigurations(this.state.configurations);
        let hasError = configurations.some(c => c.error != 'undefined' && !isStringEmpty(c.error));

        this.setState({
            ...this.state,
            isDirty: hasError,
            hasIncompleteEntries: this.checkIncompleteEntries(configurations),
            configurations: (configurations)
        });

        if (!hasError)
            this.props.onSave && this.props.onSave(configurations);
    }

    validateConfigurations(configurations: PodConfiguration[], isChange?: boolean) {
        configurations.forEach((configuration) => {
            configuration.error = undefined;
            const keyEmpty = isStringEmpty(configuration.key);
            const valueEmpty = isStringEmpty(configuration.value);
            let duplicateExists = configurations.find((c) => c.index != configuration.index && !isStringEmpty(c.key) && c.key == configuration.key);

            if (!isChange && (keyEmpty || valueEmpty))
                configuration.error = this.props.invalidErrorMsg;

            if (duplicateExists)
                configuration.error = this.props.duplicateErrorMsg;
        });
        return configurations;
    }

    checkDirtyData(configurations: PodConfiguration[]) {
        let initialData = JSON.stringify(this.props.configurations);
        let newEntries = configurations.map(c => {
            return { key: c.key, value: c.value }
        });
        let newData = JSON.stringify(newEntries);
        return !(initialData === newData);
    }

    checkIncompleteEntries(configurations: PodConfiguration[]){
        return configurations.some(
            (configuration) => {return configuration.key == "" || configuration.value == ""});
    }

    render() {
        const { configurations, hasIncompleteEntries } = this.state;
        const { isNew, lookupkey } = this.props;
        const canAdd = permissionService.isActionPermittedForGroup("CONFIGURATION_NEW");
        const canEdit = permissionService.isActionPermittedForGroup("CONFIGURATION_EDIT");
        const canSave = (!isNew || canAdd) && (isNew || canEdit);

        return(
            <div className="pod-configurations-editor-form">
                <Row>
                    <Col>
                        <BackButton onClick={this.onBack} />
                        {canSave && <SaveButton onClick={this.onSaveClick} disabled={!this.state.isDirty} />}                        
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <big>{this.props.title}</big>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small className="text-muted"> {this.props.description} </small>
                    </Col>
                </Row>
                <Row className="new-button-row">
                    <Col>
                        <NewButton disabled={hasIncompleteEntries} permissionKeySuffix="CONFIGURATION_NEW" considerContextGroup={true} onClick={this.onNewClick} />
                    </Col>
                </Row>                
                {
                    configurations && configurations.length > 0 ?
                    <Row>
                        <Col>
                            <div className="column-header-row">
                                <Row className="align-items-center">
                                    <Col className="key-title-row" xs={6}>
                                        {localise("TEXT_POD_CONFIGURATION_KEY")}
                                    </Col>
                                    <Col xs={5}>
                                        {localise("TEXT_POD_CONFIGURATION_VALUE")}
                                    </Col>
                                    <Col xs={1}/>
                                </Row>
                            </div>
                            <div className="pod-configurations-scroller">
                                { configurations.map((configuration, key) => 
                                    <PodConfigurationEditor key={key} configuration={configuration} lookupKey={lookupkey}
                                        onChange={this.onChange} onDelete={this.onDelete}/>) }
                            </div>
                        </Col>
                    </Row>                        
                    :
                    <div>
                        <hr />
                        <div className="text-muted text-center">{localise("ERROR_SEARCH_RESULT")}</div>
                    </div>
                }
            </div>
        );
    }
}
