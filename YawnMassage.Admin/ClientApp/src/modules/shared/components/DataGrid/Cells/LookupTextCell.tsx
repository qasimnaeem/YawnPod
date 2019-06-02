import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { lookupService } from "../../../services";

export function LookupTextCell(lookupKey: string) {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }
        render() {
            return (
                <td>
                    {lookupService.getText(lookupKey, this.props.dataItem[this.props.field], 
                        this.props.dataItem.groupId, this.props.dataItem.culture, this.props.dataItem.section)}
                </td>
            );
        }
    }
}