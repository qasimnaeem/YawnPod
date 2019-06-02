import * as React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { OKButton } from '../ActionButtons/ActionButtons';

export interface NotificationDialogProps {
    visible?: boolean;
    title?: string;
    message?: string;
    okClick: () => void;
    close: () => void;
}

export default class NotificationDialog extends React.Component<NotificationDialogProps> {
    constructor(props: NotificationDialogProps) {
        super(props);

        this.closeDialog = this.closeDialog.bind(this);
        this.ok = this.ok.bind(this);
    }

    closeDialog() {
        this.props.close();
    }

    ok() {
        this.props.okClick();
        this.props.close();
    }

    render() {
        const { visible, title, message } = this.props;
        return (
            <div>
                {visible && <Dialog title={title} onClose={this.closeDialog} width={400}>  
                    <p>{message}</p>
                    <DialogActionsBar>
                        <OKButton onClick={this.ok} />
                    </DialogActionsBar>
                </Dialog>}
            </div>
        );
    }
}

