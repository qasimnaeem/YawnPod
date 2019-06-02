import * as React from "react";
import { ListItem } from "../../types/dto";
import { Input } from "reactstrap";
import { groupService, localise } from "../../services";
import { permissionService } from "../../services/permission.service";

interface Props {
    onChange?: (event: any) => void;
    name?: string;
    value?: string;
    allowAny?: boolean;
    hideAllOption?: boolean;
    permissionSuffix?: string;
    disabled?: boolean;
    permission?: string;
}

interface State {
    list: ListItem[];
}
export default class GroupList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { list: [] };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {
        this.props.onChange && this.props.onChange(e);
    }

    componentDidMount() {
        let list = [...groupService.getGroupList()];
        const { hideAllOption } = this.props;

        if (hideAllOption == true) {
            list = list.filter(c => c.id != "*"); //If * group is there, remove it.
        }
        else {
            let allGroup = list.find(c => c.id == "*");
            if (allGroup)
                allGroup.name = localise("TEXT_ALLGROUP");
        }

        this.setState({ list: list });
    }

    render() {
        const { allowAny, value, name, permissionSuffix, disabled, permission } = this.props;

        const selectedItem = this.state.list.find(item => item.id == value);

        var permittedGroups: any;
        if (permission)
            permittedGroups = permissionService.getPermittedGroupsForSpecificPermission(permission);
        else
            permittedGroups = permissionService.getPermittedGroupsBySection(permissionSuffix);

        let sysGroupAccessOnly: boolean = (permittedGroups.length == 1 && permittedGroups[0] == "*");
        return (
            <Input type="select" value={(selectedItem && selectedItem.id) || (allowAny && value == "any" && value) || ""} name={name}
                onChange={this.handleChange} disabled={disabled}>
                <option value="" className="d-none"></option>
                {allowAny && !sysGroupAccessOnly && <option value="any"> {localise("TEXT_ANY_GROUP")} </option>}
                {this.state.list.map((l, key) => permittedGroups.includes(l.id) && <option value={l.id} key={key}>{l.name}</option>)}
            </Input>
        )
    }
}
