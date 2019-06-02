import * as React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { localise, lookupService } from "../../../shared/services";
import { groupService } from "../../../shared/services/group.service";

export function UserGroupRolesCell() {
    return class extends React.Component<GridCellProps> {
        constructor(props: GridCellProps) {
            super(props);
        }
    
        getGroupRolesList(){
            let groupRolesList: string = "";
            let groupGroups = this.getGroupRoleGroups(this.props.dataItem.groupRoles);
            let groupGroupTexts: string[] = [];
                   
            Object.keys(groupGroups).forEach(groupId => {
                let groupRolesText: string = '';
                groupRolesText += (groupId == '*' ? localise('TEXT_ALLGROUP') : groupService.getGroupName(groupId)) + " (";
                let roleGroups = groupGroups[groupId].map(
                    (roleGroup: any) => lookupService.getText("LIST_ROLES", roleGroup['role'], groupId));
                groupRolesText += roleGroups.join(", ");
                groupRolesText += ")";
                groupGroupTexts.push(groupRolesText);
            });
            groupRolesList = groupGroupTexts.join(", ");
            return groupRolesList;
        }

        getGroupRoleGroups(groupRoles: any[]) {
            let groups = {};
            groupRoles.forEach(groupRole => {
                const val = groupRole['groupId'];
                groups[val] = groups[val] || [];
                groups[val].push(groupRole);
            });
            return groups;
        }
    
        render() {
            return (
                <td>
                    {this.getGroupRolesList()}                    
                </td>
            );
        }
    }
}
