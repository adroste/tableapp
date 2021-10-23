import * as userActions from '../actions/user';

import { ActionSheet } from '../components/ActionSheet';
import { ActiveEventQrCodeModal } from './ActiveEventQrCodeModal';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActiveEventId } from '../reducers/events';
import { withRouter } from 'react-router-dom';

class MainNavActionSheet extends React.Component {
    static get propTypes() {
        return {
            activeEventId: PropTypes.string,
            history: PropTypes.object.isRequired,
            isOpen: PropTypes.bool.isRequired,
            onClose: PropTypes.func.isRequired,
            userActions: PropTypes.object.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    constructor(props) {
        super(props);

        this.state = {
            isActiveEventQrCodeModalOpen: false,
        };

        this.actions = [];
        if (props.activeEventId) {
            this.actions.push(
                {
                    name: 'Veranstaltung wechseln',
                    icon: 'exchange',
                    onClick: this._handleSwitchEventClick,
                },
                {
                    name: 'QR-Code der Veranstaltung',
                    icon: 'qrcode',
                    onClick: this._handleShowQRCodeClick,
                }
            );
        }

        this.actions.push(
            // {
            //     name: 'Veranstaltung verwalten',
            //     icon: 'configure',

            // },
            // {
            //     name: 'Veranstaltung verlassen',
            //     icon: 'close',

            // },
            // {
            //     isSeparator: true,
            // },
            {
                name: 'Einstellungen',
                icon: 'setting',
                onClick: this._handleSettingsClick,
            },
            {
                name: 'Ausloggen',
                icon: 'sign out',
                onClick: this._handleSignOutClick,
            },
        );
    }


    _handleCloseQRCodeClick = (e) => {
        this.setState({
            isActiveEventQrCodeModalOpen: false,
        });
    };


    _handleSettingsClick = (e) => {
        const { activeEventId } = this.props;
        this.props.history.push(activeEventId ? `/${activeEventId}/settings` : '/settings');
        this.props.onClose(e);
    }


    _handleShowQRCodeClick = (e) => {
        this.setState({
            isActiveEventQrCodeModalOpen: true,
        });
    };


    _handleSignOutClick = (e) => {
        this.props.userActions.logout();
        this.props.history.push('/');
    };


    _handleSwitchEventClick = (e) => {
        this.props.history.push('/switchevent');
        this.props.onClose(e);
    };


    render() {
        const { isOpen, onClose } = this.props;
        const { isActiveEventQrCodeModalOpen } = this.state;

        return (
            <div>
                <ActionSheet
                    actions={this.actions}
                    isOpen={isOpen}
                    onClose={onClose}
                />
                {isActiveEventQrCodeModalOpen &&
                    <ActiveEventQrCodeModal
                        onClose={this._handleCloseQRCodeClick}
                    />
                }
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        activeEventId: getActiveEventId(state.events),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    };
}


const ConnectedMainNavActionSheet = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNavActionSheet));
export { ConnectedMainNavActionSheet as MainNavActionSheet };