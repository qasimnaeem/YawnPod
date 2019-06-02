import * as React from 'react';
import { Input, Label, Col } from 'reactstrap';
import { localise } from '../../../shared/services';
import { accountService } from '../../services/account.service';
import { History } from 'history';
import { Row } from 'reactstrap';
import { alertActions } from '../../../shared/actions/alert.actions';
import { ActionButton } from '../../../shared/components/ActionButtons/ActionButtons';

interface Props {
    history: History;
}

interface State {
    email?: string;
    isEmailSent?: boolean;
}

export class ForgotPassword extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            isEmailSent: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e: any) {
        e.preventDefault();

        const { email, isEmailSent } = this.state;
        if (email && !isEmailSent) {
            accountService.forgotPassword(email)
                .then(() => {
                    this.setState({ ...this.state, isEmailSent: true })
                    alertActions.showSuccess('TEXT_FORGOT_PASSWORD_EMAIL_SENT');
                })
        }
    }

    render() {
        const { email, isEmailSent } = this.state;

        return (
            <>
                <div className="text-center mb-3">
                    <h1>{localise("TEXT_PRODUCT_NAME")}</h1>
                    <legend>{localise("TEXT_ENTEREMAIL")}</legend>
                </div>
                <br />
                <form onSubmit={this.handleSubmit}>

                    <fieldset>
                        <Row >
                            <Col >
                                <Label className="setPasswordLabel">{localise("TEXT_EMAIL")}</Label>
                                <Input type="email" placeholder={localise("TEXT_EMAIL")} autoFocus name="email" value={email}
                                    autoComplete="email" onChange={this.handleChange} maxLength={100} required />
                            </Col>
                        </Row>
                    </fieldset>

                    <br />
                    <Row >
                        <Col>
                            <ActionButton type="submit" color="primary" disabled={isEmailSent} textKey="BUTTON_SENDREQUEST" />
                        </Col>
                    </Row>
                </form>
            </>
        );
    }
}