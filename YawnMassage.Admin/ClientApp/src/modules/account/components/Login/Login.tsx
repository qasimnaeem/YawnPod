import * as React from 'react';
import { Input, Label, Col, Row } from 'reactstrap';
import { localise } from '../../../shared/services';
import { accountService } from '../../services/account.service';
import { History } from 'history';
import { Link } from 'react-router-dom';
import { ActionButton } from '../../../shared/components/ActionButtons/ActionButtons';

interface Props {
    history: History;
}

interface State {
    username?: string;
    password?: string;
    rememberMe?: boolean;
    loginError?: string,
}

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            loginError: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleCheckedChange(e: any) {
        const { name, checked } = e.target;
        this.setState({ [name]: checked });
    }

    handleSubmit(e: any) {

        e.preventDefault();

        const { username, password, rememberMe } = this.state;

        if (username && password) {

            this.setState({ ...this.state, loginError: undefined })

            accountService.login(username, password, rememberMe || false)
                .then((authResult) => {
                    if (authResult.isSucceeded)
                        this.props.history.push("/overview/dashboard");
                    else
                        this.setState({ ...this.state, loginError: authResult.errorCode })
                })
                .catch(err => this.setState({ ...this.state, loginError: err }));
        }
    }

    render() {
        const { username, password, rememberMe, loginError } = this.state;

        return (
            <>
                <div className="text-center mb-3">
                    <h1 className="yawnlogo">{localise("TEXT_PRODUCT_NAME")}</h1>
                    <legend className="title-text">{localise("TEXT_WELCOME")}</legend>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset className="login-fieldset">
                        <span>{loginError && <small className="text-danger"> {localise(loginError)} </small>}</span>
                        <Row className="mb-3">
                            <Col>
                                <Label className="title-text">{localise("TEXT_EMAIL")}</Label>
                                <Input type="email" className="text-style" placeholder={localise("TEXT_EMAIL")} autoFocus name="username" value={username}
                                    autoComplete="username" onChange={this.handleChange} maxLength={100} required />
                                <small className="text-muted remarks"> {localise("REMARK_EMAIL")} </small>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col >
                                <Label className="title-text">{localise("TEXT_PASSWORD")}</Label>
                                <Input type="password" className="text-style" placeholder={localise("TEXT_PASSWORD")} name="password"
                                    maxLength={100} value={password} onChange={this.handleChange} required />
                                <small className="text-muted remarks"> {localise("REMARK_PASSWORD")} </small>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="auto">
                                <Input type="checkbox" className="check-style" name="rememberMe" checked={rememberMe} onChange={this.handleCheckedChange} />
                                <Label className="check-label" check>
                                    {localise('TEXT_REMEMBERME')}
                                </Label>
                            </Col>
                            <Col md="auto">
                                <Link className="forget-password-label" to="/account/forgotpassword">{localise("TEXT_FORGOTPASSWORD")}</Link>
                            </Col>
                        </Row>
                    </fieldset>
                    <Row className="mt-5">
                        <Col>
                            <ActionButton type="submit" className="login-button" color="primary" textKey="BUTTON_LOGIN" />
                        </Col>
                        <Col xs="auto">
                            <ActionButton disabled={true} className="resend-button" color="secondary" textKey="BUTTON_SIGNUP" />
                        </Col>
                    </Row>
                </form>
            </>
        );
    }
}