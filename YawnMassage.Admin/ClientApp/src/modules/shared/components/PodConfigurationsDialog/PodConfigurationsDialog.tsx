import * as React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { ActionButton } from '../ActionButtons/ActionButtons';
import { PodConfigurationsForm } from "./PodConfigurationsForm";
import { permissionService } from "../../services";
import { PodConfiguration } from "../../types/dto";

interface Props { 
    configurations: string;
    onChange?: (configurations: string) => void;
    isNew?: boolean;
    title?: string;
    description?: string;
    duplicateErrorMsg?: string;
    invalidErrorMsg?: string;
    lookupKey: string;
}

interface State {
    isEditingConfigurations: boolean;
}

export class PodConfigurationsDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isEditingConfigurations: false
        }
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    showDialog() {
        this.setState({ isEditingConfigurations: true });
    }

    hideDialog() {
        this.setState({ isEditingConfigurations: false });
    }

    onSave(entries: PodConfiguration[]) {
        entries.forEach(c => delete c.index);
        let configurationsJson = JSON.stringify(entries);        
        this.props.onChange && this.props.onChange(configurationsJson);
        this.hideDialog();
    }
    
    render() {
        const podConfigurationsAllowed = permissionService.isActionPermittedForGroup("CONFIGURATION");
        const { title, description, isNew, configurations, invalidErrorMsg, duplicateErrorMsg, lookupKey } = this.props;

        return(
            <>
                <ActionButton onClick={this.showDialog} isPermissionAllowed={podConfigurationsAllowed} 
                    textKey="BUTTON_POD_CONFIGURATION" color="secondary" icon="fa-wrench" />
                {
                    this.state.isEditingConfigurations
                    &&
                    <Dialog width={600}>
                        <PodConfigurationsForm title={title} description={description} isNew={isNew} lookupkey={lookupKey}
                            configurations={JSON.parse(configurations)} onBackClick={this.hideDialog} onSave={this.onSave}
                            duplicateErrorMsg={duplicateErrorMsg} invalidErrorMsg={invalidErrorMsg} />
                    </Dialog>
                }
            </>
        );        
    }
}
