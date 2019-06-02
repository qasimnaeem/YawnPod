import * as React from "react";
import { Input, InputProps } from 'reactstrap';

export const NumericInput = (props: InputProps) =>
    <Input {...props} onKeyPress={checkNumericInput}/>


function checkNumericInput(event: any) {
    if (!(event.which <= 57 && event.which >= 48)) {
        event.preventDefault();
    }
}