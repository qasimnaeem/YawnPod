import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { formatDate } from "@telerik/kendo-intl";

export function DateTimeFormatCell(dateTimeFormat?: string) {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }

        render() {
            return (
                <td>
                    {formatDate(new Date(this.props.dataItem[this.props.field]), dateTimeFormat == null ? "dd MMM yy HH:mm": dateTimeFormat)}
                </td>
            );
        }
    }
}