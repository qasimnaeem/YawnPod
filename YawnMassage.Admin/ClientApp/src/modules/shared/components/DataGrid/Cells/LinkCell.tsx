import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { Link } from "react-router-dom";

export function LinkCell(routeResolver: (dataItem: any) => string) {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }
        render() {
            const { props } = this;
            return (
                <td>
                    <Link to={routeResolver(props.dataItem)}> {props.dataItem[props.field]} </Link>
                </td>
            );
        }
    }
}