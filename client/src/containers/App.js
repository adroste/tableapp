import * as desktopAppActions from '../actions/desktopApp';
import * as notificationsActions from '../actions/notifications';

import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { LoginStateEnum, getLastActiveEventId, getLoginState, hasAcceptedTos } from '../reducers/user';
import { isDesktopApp, isMiniControlViewActive } from '../reducers/desktopApp';

import { AcceptTosView } from './AcceptTosView';
import { AllEventsView } from './AllEventsView';
import { ApiConnectionStateEnum } from '../api/ApiConnectionStateEnum';
import { ApiDisconnectedView } from '../components/ApiDisconnectedView';
import { EventWrapper } from './EventWrapper';
import { LegalInfosPage } from '../components/LegalInfosPage';
import PropTypes from 'prop-types';
import React from 'react';
import { ScreenBroadcastHelper } from './ScreenBroadcastHelper';
import { SettingsView } from './SettingsView';
import { SwitchEventView } from './SwitchEventView';
import { TitleBar } from '../components/TitleBar';
import { UserLoginView } from './UserLoginView';
import { WebFrameScaler } from '../WebFrameScaler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getConnectionState } from '../reducers/api';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    position: relative;
    max-width: 600px;
    padding: 0 10px 75px 10px;
    margin: 0 auto;
`;


const CenteredP = styled.p`
    margin-top: 2em;
    text-align: center;
`;


/**
 * Toplevel routing view.
 * 
 * __Exported component is connected to router.__
 * __Exported component is connected to redux-store. Some props are injected by HOC.__
 * @param {object} props
 * @param {boolean} props.apiDisconnected indicates if api is currently disconnected (injected by redux)
 * @param {object} props.desktopAppActions object containing bound desktopAppAction (injected by redux)
 * @param {object} props.history object containing history (injected by router)
 * @param {boolean} props.isDesktopApp indicates if client is run as desktop-app
 * @param {boolean} props.userHasAcceptedTos indicates if user has accepted terms of service
 * @param {boolean} props.userLoggedIn indicates if user is logged in (injected by redux)
 */
class App extends React.Component {
    static get propTypes() {
        return {
            apiDisconnected: PropTypes.bool.isRequired,
            desktopAppActions: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired,
            isDesktopApp: PropTypes.bool.isRequired,
            userHasAcceptedTos: PropTypes.bool.isRequired,
            userLoggedIn: PropTypes.bool.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    /**
     * Lifecycle that checks for electron context.
     * @function
     */
    UNSAFE_componentWillMount() {
        if (window.electron) { // if window.electron is set => desktop app
            const wfs = new WebFrameScaler();
            wfs.setZoomLevel(1.0); // reset zoom on start
            this.props.desktopAppActions.initDesktopApp();
            this.props.history.replace('/');
        }
    }


    componentDidMount() {
        this._readNotification();
    }


    componentDidUpdate() {
        this._readNotification();
    }

    _lastNId = undefined;
    _readNotification = () => {
        const params = new URLSearchParams(this.props.location.search);
        const nId = params.get('nId');
        if (nId === undefined || this._lastNId === nId)
            return;
        this._lastNId = nId;
        this.props.notificationsActions.readNotification(nId, false);
    };


    /**
     * Renders content.
     * @function
     * @private
     */
    _renderContent() {
        const {apiDisconnected, userHasAcceptedTos, lastActiveEventId, userLoggedIn} = this.props;

        if (apiDisconnected)
            return (
                <ApiDisconnectedView/>
            );

        if (!userLoggedIn)
            return (
                <UserLoginView/>                
            );
        
        if (!userHasAcceptedTos)
            return (
                <AcceptTosView/>
            );

        return ( 
            <Switch>
                <Route exact path='/' render={() => (
                    lastActiveEventId ? (
                        <Redirect to={`/${lastActiveEventId}`}/>
                    ) : (
                        <Redirect to='/switchevent'/>
                    )
                )}/>
                <Route path='/searchevents' component={AllEventsView}/>
                <Route path='/switchevent' component={SwitchEventView}/>
                <Route path='/settings' component={SettingsView}/>
                <Route path='/:eventId' component={EventWrapper}/>
            </Switch>
        );
    }


    render() {
        const { isDesktopApp, isMiniControlViewActive } = this.props;
        const renderLegalInfosLink = !isMiniControlViewActive;

        return (
            <ContentWrapper id="contentWrapper">
                {isDesktopApp &&
                    <TitleBar/>
                }
                <Switch>
                    <Route exact path='/legalinfos' component={LegalInfosPage}/>
                    <Route path='*' render={() => this._renderContent()}/>
                </Switch>
                {renderLegalInfosLink &&
                    <CenteredP>
                        <Link to='/legalinfos'>
                            Impressum / Datenschutz / Nutzungsbedingungen
                        </Link>
                    </CenteredP>
                }
                {isDesktopApp && 
                    <ScreenBroadcastHelper/>
                }
            </ContentWrapper>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        apiDisconnected: getConnectionState(state.api) === ApiConnectionStateEnum.DISCONNECTED,
        userHasAcceptedTos: hasAcceptedTos(state.user),
        isDesktopApp: isDesktopApp(state.desktopApp),
        isMiniControlViewActive: isMiniControlViewActive(state.desktopApp),
        lastActiveEventId: getLastActiveEventId(state.user),
        userLoggedIn: getLoginState(state.user) === LoginStateEnum.LOGGED_IN,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        desktopAppActions: bindActionCreators(desktopAppActions, dispatch),
        notificationsActions: bindActionCreators(notificationsActions, dispatch),
    };
}


const ConnectedApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export { ConnectedApp as App };
