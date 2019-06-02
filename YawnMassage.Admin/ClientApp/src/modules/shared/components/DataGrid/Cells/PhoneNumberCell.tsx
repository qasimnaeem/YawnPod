import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { lookupService } from "../../../services";

export function PhoneNumberCell() {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }

        getPhoneNumber(){
            const mobileNumber = this.props.dataItem[this.props.field];
            return lookupService.getText("LIST_IDDCODE", mobileNumber.iddCode)
                                            + "-" + mobileNumber.number;
        }
    
        render() {
            return (
                <td>
                    {this.getPhoneNumber()}                    
                </td>
            );
        }
    }
}
