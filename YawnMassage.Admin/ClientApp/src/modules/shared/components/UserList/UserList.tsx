import * as React from "react";
import { Input } from "reactstrap";

import { ListItem } from "src/modules/shared/types/dto";
import { userService } from "src/modules/users/services/user.service";

interface Props {
    groupId: string;
    onChange?: (value: string, name: string) => void;
    name?: string;
    disabled?: boolean;
    value?: string;
}

interface State {
    list: ListItem[];
}
export default class UserList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { list: [] };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        var userName = event.target.options[event.target.selectedIndex].text;
        this.props.onChange && this.props.onChange(event.target.value, userName);
    }

    componentDidMount() {
        userService.getUsers(this.props.groupId).then((users) => {
            this.setState({ list: users });
        });
    }

    render() {
        const { name, disabled, value } = this.props;
        const selectedItem = this.state.list.find(item => item.id == value);
        return (
            <Input type="select" value={(selectedItem && selectedItem.id) || ''} name={name}
                onChange={this.handleChange} disabled={disabled}>
                <option value="" className="d-none"></option>
                {this.state.list.map((l, key) => <option value={l.id} key={key}>{l.name}</option>)}
            </Input>
        )
    }
}
