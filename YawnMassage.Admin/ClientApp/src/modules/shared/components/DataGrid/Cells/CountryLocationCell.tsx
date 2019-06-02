import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { countryService } from "../../../services/country.service";

export function CountryLocationCell() {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }
        render() {

            const { field, dataItem } = this.props;
            let text = '';
            if (field == 'country')
                text = countryService.getCountryName(dataItem['country']);
            else if (field == 'state')
                text = countryService.getStateName(dataItem['country'], dataItem['state'])

            return (
                <td>
                    {text}
                </td>
            );
        }
    }
}