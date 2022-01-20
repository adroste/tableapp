import * as adminActions from '../actions/admin';

import { Button, Form, Header, Segment } from 'semantic-ui-react';

import { AdminCreateNewEventForm } from './AdminCreateNewEventForm';
import { AdminSendTestEmailForm } from './AdminSendTestEmailForm';
import { NavBar } from './NavBar';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isAdminLoggedIn } from '../reducers/admin';

class AdminView extends React.Component {
    /**
     * 
     */
    static get propTypes() {
        return {

        };
    };

    static get defaultProps() {
        return {};
    };


    _handlePasswordSubmit = (e) => {
        const password = e.target.password.value;
        this.props.adminActions.adminLogin(password);
    };


    render() {
        const { isAdminLoggedIn } = this.props;

        if (!isAdminLoggedIn)
            return (
                <div>
                    <NavBar
                        hasGoBack
                        mainContent={"Admin Login"}
                    />
                    <Segment>
                        <Header as='h3'>Passwort</Header>
                        <Form onSubmit={this._handlePasswordSubmit}>
                            <Form.Field>
                                <input name='password' type='password' placeholder='Admin Passwort' />
                            </Form.Field>
                            <Button type='submit'>Weiter</Button>
                        </Form>
                    </Segment>
                </div>
            );

        return (
            <div>
                <NavBar
                    hasGoBack
                    mainContent={"Admin"}
                />
                <Header content="TABLE Administration"/>
                <AdminCreateNewEventForm />
                <br/>
                <AdminSendTestEmailForm />
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        isAdminLoggedIn: isAdminLoggedIn(state.admin),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        adminActions: bindActionCreators(adminActions, dispatch),
    };
}


const ConnectedAdminView = connect(mapStateToProps, mapDispatchToProps)(AdminView);
export { ConnectedAdminView as AdminView };