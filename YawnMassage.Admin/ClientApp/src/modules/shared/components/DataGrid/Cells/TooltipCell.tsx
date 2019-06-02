import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";

export function TooltipCell(tooltipField?: string | undefined) {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }

        render() {
            return (
                <td title={this.props.dataItem[tooltipField || "tooltip"]}>
                    {this.props.dataItem[this.props.field]}
                </td>
            );
        }
    }
}