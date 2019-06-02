import * as React from "react";
import { Field } from "redux-form";
import { PodConfigurationsDialog } from "../../../shared/components/PodConfigurationsDialog/PodConfigurationsDialog";
import { DetailFormProps } from "../../../shared/components/DetailPage";
import { localise } from "../../../shared/services";

const PodHeaderButtons = (formProps: DetailFormProps) => {

    return <>
        <Field name="configurations" 
            component={(props: any) =>
                <PodConfigurationsDialog title={localise('TEXT_POD_CONFIGURATION_TITLE')} 
                    description={localise('TEXT_POD_CONFIGURATION_DESCRIPTION')}
                    duplicateErrorMsg={localise('ERROR_DUPLICATE_POD_CONFIGURATION')} 
                    invalidErrorMsg={localise('ERROR_INVALID_POD_CONFIGURATION')}
                    configurations={props.input.value}
                    isNew={formProps.isNew} 
                    onChange={props.input.onChange} 
                    lookupKey="LIST_POD_CONFIGURATION_KEYS"
                />
            }
        />
    </>
}

export default PodHeaderButtons;