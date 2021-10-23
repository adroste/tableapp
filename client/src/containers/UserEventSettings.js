import * as eventsActions from '../actions/events';

import { Button, Header, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { getActiveEventId, getActiveEventName, getActiveEventUserPermissionLevel } from '../reducers/events';

import { Confirm } from '../components/Confirm';
import { PermissionLevelEnum } from '../PermissionLevelEnum';
import PropTypes from 'prop-types';
import React from 'react';
import { RoleLabel } from './RoleLabel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserId } from '../reducers/user';
import { getUserRoleId } from '../reducers/eventInfo';
import styled from 'styled-components';

const ButtonGroupMargin = styled.div`
    & {
        margin-top: 1em;
    }

    &&& > button {
        margin-top: .5em;
    }
`;


const HorizontalList = styled.div`
    display: flex;
    align-items: center;
`;


class UserEventSettings extends React.Component {
    static get propTypes() {
        return {
            // from withRouter HOC
            match: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    constructor(props) {
        super(props);

        this.state = {
            isLeaveConfirmOpen: false,
        };
    }


    _handleLeaveConfirmAcceptClick = (e) => {
        this.props.eventsActions.leaveEvent(this.props.activeEventId);
        this.props.history.push('/');
        this.props.history.push('/settings');
    };


    _handleLeaveConfirmCancelClick = (e) => {
        this.setState({ isLeaveConfirmOpen: false });
    };


    _handleLeaveEventClick = (e) => {
        this.setState({ isLeaveConfirmOpen: true });
    };


    render() {
        const { activeEventId, activeEventName, userCanManageActiveEvent, userRoleId } = this.props;
        const { isLeaveConfirmOpen } = this.state;

        return (
            <div>
                <Header content="Aktuelle Veranstaltung"/>
                <Segment>
                    <Header as='h3'>{activeEventName}</Header>
                    <HorizontalList>
                        <div>Aktuelle Rolle:&nbsp;</div>
                        <RoleLabel
                            roleId={userRoleId}
                        />
                    </HorizontalList>
                    <ButtonGroupMargin>
                        {userCanManageActiveEvent &&
                            <Button
                                as={Link}
                                content='Veranstaltung verwalten'
                                color='violet'
                                fluid
                                icon='configure'
                                to={`/${activeEventId}/eventsettings`}
                            />
                        }
                        <Button
                            content='Veranstaltung verlassen'
                            color='red'
                            fluid
                            icon='close'
                            onClick={this._handleLeaveEventClick}
                        />
                    </ButtonGroupMargin>
                </Segment>
                <Confirm
                    confirmText='Verlassen'
                    content={
                        <div>
                            <p>Willst du die Veranstaltung "{activeEventName}" wirklich verlassen?</p>
                            <p>Du wirst keine weiteren Benachrichtigungen mehr erhalten können.</p>
                        </div>
                    }
                    hasCancel
                    headerText='Veranstaltung verlassen'
                    isNegative
                    isOpen={isLeaveConfirmOpen}
                    onCancel={this._handleLeaveConfirmCancelClick}
                    onConfirm={this._handleLeaveConfirmAcceptClick}
                />
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    const userId = getUserId(state.user);

    return {
        activeEventId: getActiveEventId(state.events),
        activeEventName: getActiveEventName(state.events),
        userCanManageActiveEvent: getActiveEventUserPermissionLevel(state.events) >= PermissionLevelEnum.ADMINISTRATOR,
        userRoleId: getUserRoleId(state.eventInfo, userId),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        eventsActions: bindActionCreators(eventsActions, dispatch),
    };
}


const ConnectedUserEventSettings = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEventSettings));
export { ConnectedUserEventSettings as UserEventSettings };