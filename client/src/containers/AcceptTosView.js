import * as userActions from '../actions/user';

import { Button, Modal } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { config } from '../config';
import { connect } from 'react-redux';

class AcceptTosView extends React.Component {
    static get propTypes() {
        return {
            userActions: PropTypes.object.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    _handleAcceptClick = (e) => {
        this.props.userActions.acceptTos();
    };


    _handleDeclineClick = (e) => {
        this.props.userActions.logout();
    };


    render() {
        return (
            <Modal
                open
            >
                <Modal.Header>
                    Nutzungsbedingungen
                </Modal.Header>
                <Modal.Content>
                    <div dangerouslySetInnerHTML={ {__html: config.HTML_TERMS_OF_SERVICE } } />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Ablehnen"
                        onClick={this._handleDeclineClick}
                    />
                    <Button
                        content="Annehmen"
                        icon="checkmark"
                        positive
                        onClick={this._handleAcceptClick}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        // TODO
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    };
}


const ConnectedAcceptTosView = connect(mapStateToProps, mapDispatchToProps)(AcceptTosView);
export { ConnectedAcceptTosView as AcceptTosView };