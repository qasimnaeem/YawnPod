import * as React from "react";
import { Input } from "reactstrap";
import { lookupService, localise } from "../../services";

interface LookupDropDownProps {
    onChange?: (event: React.ChangeEvent) => void;
    name?: string;
    groupId?: string;
    culture?: string;
    section?: string;
    lookupKey: string;
    value?: string;
    disabled?: boolean;
    allowAny?: boolean;
    allowBlank?: boolean;
    textAny?: string;
    allowAll?: boolean;
    textAll?: string;
    parentLookupKey?: string;
}

export class LookupDropDown extends React.Component<LookupDropDownProps> {

    constructor(props: LookupDropDownProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent) {
        this.props.onChange && this.props.onChange(e);
    }

    render() {
        const { allowAll, textAll, allowBlank, allowAny, textAny, name, disabled,
            value, lookupKey, groupId, culture, section, parentLookupKey } = this.props;

        let lookupList = lookupService.getList(lookupKey, groupId, culture, section);

        if (parentLookupKey)
            lookupList = lookupList.filter(lookup => lookup.value != parentLookupKey);

        return (
            <Input disabled={disabled} type="select" value={value} name={name}
                onChange={this.handleChange}>
                {allowBlank ? <option value=""></option> : <option value="" className="d-none"></option>}
                {allowAll && <option value="*">{textAll && localise(textAll)}</option>}
                {allowAny && <option value="any">{textAny && localise(textAny)}</option>}
                {lookupList.map((l, key) => <option value={l.value} key={key}>{l.text}</option>)}
            </Input>
        )
    }
}