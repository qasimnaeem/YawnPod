import * as React from "react";
import { Input } from "reactstrap";
import { lookupService, localise } from "../../../shared/services";

interface RoleDropDownProps {
    onChange?: (event: React.ChangeEvent) => void;
    name?: string;
    value?: string;
    section?: string;
    disabled?: boolean;
    allowAny?: boolean;
    textAny?: string;
    groupId?: string;
}

export class RoleDropDown extends React.Component<RoleDropDownProps> {

    constructor(props: RoleDropDownProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent) {
        this.props.onChange && this.props.onChange(e);
    }

    render() {
        const { allowAny, textAny, name, disabled, value, section, groupId } = this.props;

        let lookupList = lookupService.getList("LIST_ROLES", groupId, undefined, section);

        return (
            <Input disabled={disabled} type="select" value={value} name={name}
                onChange={this.handleChange}>
                <option value="" className="d-none"></option>
                {allowAny && <option value="any">{textAny && localise(textAny)}</option>}
                <option value="*">{localise("TEXT_ALLROLE")}</option>
                {lookupList.map((l, key) => <option value={l.value} key={key}>{l.text}</option>)}
            </Input>
        )
    }
}