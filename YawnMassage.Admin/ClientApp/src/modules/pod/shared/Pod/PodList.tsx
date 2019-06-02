import * as React from "react";
import { Input } from "reactstrap";
import { ListItem } from "src/modules/shared/types/dto";
import { podService } from "../../services/pod.service";

interface PodProps {
    groupId: string;
    onChange?: (event:any) => void;
    name?: string;
    value?: string;
    disabled?: boolean;
}

interface State {
    list: ListItem[];
}


export default class PodList extends React.Component<PodProps, State> {

    constructor(props: PodProps) {
        super(props);

        this.state = { list: [] };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.props.onChange && this.props.onChange(event);
    }

    componentDidMount() {
        var scope = this;
        podService.getPods(this.props.groupId).then((pods) => {
            scope.setState({ list: pods });
        });
    }

    render() {
        const { name, disabled, value } = this.props;

        const selectedItem = this.state.list.find(item => item.id == value);

        return (
            <Input type="select" value={selectedItem && selectedItem.id || ''} name={name}
                onChange={this.handleChange} disabled={disabled}>
                <option value="" className="d-none"></option>
                {this.state.list.map((l, key) => <option value={l.id} key={key}>{l.name}</option>)}
            </Input>
        )
    }
}
