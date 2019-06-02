import * as React from 'react';
import { localise } from '../../../shared/services';
import { accountService } from '../../services/account.service';
import { History } from 'history';

interface Props {
    history: History;
}

export class SignOut extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.signOut();
    }

    signOut() {
        accountService.logout()
            .then(() => {
                this.props.history.push(`/account/login`);
            })
            .catch();
    }

    render() {
        return (
            <>
                <div className="text-center mb-3">
                    <h1>{localise("TEXT_PRODUCT_NAME")}</h1>
                    <legend>{localise("TEXT_SIGNING_OUT")}</legend>
                </div>
            </>
        )
    }
}