import * as React from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import { localise, accountSessionService } from "../../modules/shared/services";

interface State {
    userMenuOpen: boolean;
}

export class UserMenu extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            userMenuOpen: false
        }

        this.toggleUserMenu = this.toggleUserMenu.bind(this);
    }

    toggleUserMenu() {
        this.setState({ ...this.state, userMenuOpen: !this.state.userMenuOpen });
    }

    render() {
        return <Dropdown tag="li" isOpen={this.state.userMenuOpen} toggle={this.toggleUserMenu}>
            <DropdownToggle tag="a" href="javascript:void(0);" className="no-after peers fxw-nw ai-c lh-1">
                <div className="peer mR-10">
                    <img className="w-2r bdrs-50p" src="/images/avatar.png" alt="User Avatar" />
                </div>
            </DropdownToggle>
            <DropdownMenu tag="ul" className="fsz-sm">
                <li>
                    <a className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                        {accountSessionService.getLoggedInUserDisplayName()}
                    </a>
                </li>
                <li>
                    <Link to="/account/signout" className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                        <i className="fas fa-sign-out-alt mR-10"></i>
                        <span>{localise("TEXT_SIGNOUT")}</span>
                    </Link>
                </li>
            </DropdownMenu>
        </Dropdown>
    }
}