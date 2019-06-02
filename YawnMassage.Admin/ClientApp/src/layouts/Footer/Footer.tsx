import * as React from 'react';
import { Container } from 'reactstrap';

interface Props {
    default?: boolean,
    fluid?: boolean
}

class Footer extends React.Component<Props>{
    render(){
        return (
            <footer className={"footer"
                + (this.props.default ? " footer-default":"")
            }>
                <Container fluid={this.props.fluid ? true:false}>
                    <div className="copyright">
                        {/* &copy; {(new Date()).getFullYear()} */}
                    </div>
                </Container>
            </footer>
        );
    }
}

export default Footer;
