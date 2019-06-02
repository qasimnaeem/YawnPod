import * as React from "react";
import Label from "reactstrap/lib/Label";
import FormGroup from "reactstrap/lib/FormGroup";
import { localise } from "../../services";

interface FormFieldContentProps {
    input?: any;
    labelKey?: string;
    remarksKey?: string;
    inputComponent: any;
    required?: boolean;
    disabled?: boolean;
    meta?: { touched: any, error: any, warning: any };
    disableRequiredToken?: boolean;
}

const FormFieldContent = (props: FormFieldContentProps) => {

    const { meta, input } = props;
    const Component = props.inputComponent;

    return (
        <FormGroup>
            {props.labelKey && <Label>
                {props.labelKey && localise(props.labelKey)}
                {props.required && !props.disableRequiredToken && (' *')}
            </Label>}
            <Component {...input} disabled={props.disabled}
                onChange={(param: any) => input && input.onChange(param.target.value)} />
            <div>
                {props.remarksKey && meta && (!meta.error || !meta.touched) &&
                    <small className="text-muted">
                        {localise(props.remarksKey)}
                    </small>}
                {meta && meta.touched && meta.error &&
                    <small className="text-danger">
                        {meta.error}
                    </small>}
            </div>
        </FormGroup>)
}

export default FormFieldContent
