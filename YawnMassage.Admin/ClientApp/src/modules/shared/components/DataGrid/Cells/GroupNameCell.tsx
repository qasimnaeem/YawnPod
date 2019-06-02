import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { localise } from "../../../services";
import { groupService } from "../../../../shared/services/group.service";

export function GroupNameCell() {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }

        getGroupName() {                        
            let value = this.props.dataItem[this.props.field];
            return value == "*" ? localise('TEXT_ALLGROUP') : 
                    this.props.field == "groupId" ? groupService.getGroupName(value) : value;
        }

        render() {            
            return (
                <td>
                    {this.getGroupName()}
                </td>
            );
        }
    }
}