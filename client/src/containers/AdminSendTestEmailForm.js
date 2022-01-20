import * as adminActions from '../actions/admin';

import { Button, Form, Header, Input, Segment } from 'semantic-ui-react';

import { FormFieldAction } from '../components/FormFieldAction';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class AdminSendTestEmailForm extends React.Component {
    static get propTypes() {
        return {
        };
    };

    static get defaultProps() {
        return {};
    };


    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }


    _handleEmailChange = (e, data) => {
        this.setState({
            email: data.value
        });
    };


    _handleSendClick = () => {
        this.props.adminActions.sendTestEmail(this.state.email);
    };


    render() {
        const { email } = this.state;

        return (
            <div>
                <Form
                    as={Segment}
                >
                    <Form.Field>
                        <Header 
                            content="Test Email Senden"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            placeholder="Empfänger E-Mail Adresse"
                            value={email}
                            onChange={this._handleEmailChange}
                        />
                    </Form.Field>
                    <FormFieldAction>
                        <Button
                            content="Senden"
                            primary
                            onClick={this._handleSendClick}
                        />
                    </FormFieldAction>
                </Form>
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        adminActions: bindActionCreators(adminActions, dispatch),
    };
}


const ConnectedAdminSendTestEmailForm= withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminSendTestEmailForm));
export { ConnectedAdminSendTestEmailForm as AdminSendTestEmailForm };