import * as React from "react";
import { MobileNumber } from '../../../shared/types/dto';
import { LookupDropDown } from '../LookupDropDown/LookupDropDown';
import "./mobile-number-input.css";
import { localise } from "../../../shared/services";
import { NumericInput } from "../NumericInput/NumericInput";

interface MobileNumberInputProps {
    value?: string;
    onChange?: (value: any) => void;
}

export const mobileNumberRequiredFieldValidator = (value: string) => {
    let mobileNumber: MobileNumber = JSON.parse(value || "{}");
    let invalid = (!mobileNumber.iddCode || mobileNumber.iddCode.trim().length == 0) || 
                    (!mobileNumber.number || mobileNumber.number.trim().length == 0);
    return (invalid) ? localise("ERROR_FIELD_REQUIRED") : undefined;
}

export class MobileNumberInput extends React.Component<MobileNumberInputProps>{
    
    constructor(props: MobileNumberInputProps) {
        super(props);
        this.onIddCodeChange = this.onIddCodeChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
    }

    getIddCode() {
        let mobileNumber : MobileNumber = JSON.parse(this.props.value || "{}");
        return mobileNumber.iddCode;
    }

    getNumber() {
        let mobileNumber : MobileNumber = JSON.parse(this.props.value || "{}");
        return mobileNumber.number;
    }

    onIddCodeChange(event: any) {
        let mobileNumber: MobileNumber = {
            iddCode : event.target.value,
            number : this.getNumber()
        };

        let e = {
            target : {
                value : JSON.stringify(mobileNumber)
            }
        };
        this.props.onChange && this.props.onChange(e);        
    }

    onNumberChange(event: any) {
        let mobileNumber: MobileNumber = {
            iddCode : this.getIddCode(),
            number : event.target.value
        };

        let e = {
            target : {
                value : JSON.stringify(mobileNumber)
            }
        };
        this.props.onChange && this.props.onChange(e);
    }

    render() {
        return(
            <div className="mobile-number-input-container">
                <LookupDropDown value={this.getIddCode() || ""} onChange={this.onIddCodeChange} lookupKey="LIST_IDDCODE" />
                <NumericInput value={this.getNumber()} onChange={this.onNumberChange} />
            </div>
        );
    }
}