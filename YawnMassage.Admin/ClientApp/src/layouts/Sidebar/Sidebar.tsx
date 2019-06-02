import * as React from 'react';
import { SidebarMenuGroup } from './SidebarMenuGroup';
import { sidebarRoutes } from '../../routes/sidebar-routes';
import { configService } from 'src/modules/shared/services';

class Sidebar extends React.Component<any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        let systemLogoURL = configService.getConfigurationValue('SYSTEM_LOGO_URL', '*', '*');
        return (
            <div className="sidebar">
                <div className="sidebar-inner">

                    <div className="sidebar-logo text-center pt-2">
                        <img src={systemLogoURL} alt="Brand Logo" width="45" />
                    </div>

                    <ul className="sidebar-menu scrollable pos-r">
                        {
                            sidebarRoutes.map((r, key) =>
                                <SidebarMenuGroup route={r} location={this.props.location} key={key} />)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
