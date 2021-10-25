import * as eventsActions from '../actions/events';

import { Button, Dropdown, Form, Modal } from 'semantic-ui-react';
import { getRoleList, getUserDict } from '../reducers/eventInfo';

import { PermissionLevelEnum } from '../PermissionLevelEnum';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActiveEventId } from '../reducers/events';
import { getUserId } from '../reducers/user';
import styled from 'styled-components';

const NameDiv = styled.div`
    font-size: 14px;
    word-wrap: break-word;
    margin-right: .3em;
    margin-bottom: 1em;

    & > span {
        font-size: 12px;
        color: rgba(0,0,0,.6);
        display: block;
    }
`;


class ManageUserRoleModal extends React.Component {
    /**
     * @property {string} userId id of user to manage
     * @property {function} onClose callback when modal gets closed
     */
    static get propTypes() {
        return {
            userId: PropTypes.string.isRequired,
            onClose: PropTypes.func,
        };
    };

    static get defaultProps() {
        return {};
    };


    constructor(props) {
        super(props);

        const { permissionLevel, roleId } = props.userDict[props.userId];

        const roleOptions = this.props.roleList.map(({ id, name }) => ({ key: id, value: id, text: name }));
        const permissionOptions = [
            // { key: PermissionLevelEnum.NOT_A_USER, value: PermissionLevelEnum.NOT_A_USER, text: 'Nicht der Veranstaltung zugehörig' },
            // { key: PermissionLevelEnum.USER, value: PermissionLevelEnum.USER, text: 'Nutzer' },
            { key: PermissionLevelEnum.MODERATOR, value: PermissionLevelEnum.MODERATOR, text: 'Moderator' },
            { key: PermissionLevelEnum.ADMINISTRATOR, value: PermissionLevelEnum.ADMINISTRATOR, text: 'Administrator' },
        ];

        this.state = {
            permissionLevel,
            roleId,
            roleOptions,
            permissionOptions,
        }
    }


    // reset = () => {
    //     const { permissionLevel, roleId } = this.props.userDict[this.props.userId];
    //     this.setState({
    //         permissionLevel,
    //         roleId,
    //     });
    // };


    _handleCancelClick = (e) => {
        if (this.props.onClose)
            this.props.onClose(e);
    };

    _handleSaveClick = (e) => {
        const { activeEventId, userId, onClose, eventsActions } = this.props;
        const { roleId, permissionLevel } = this.state;
        eventsActions.changeUserPermissionLevelAndRole(
            activeEventId, userId, permissionLevel, roleId || null);
        if (onClose)
            onClose(e);
    };

    _handleRoleChange = (e, { value }) => {
        this.setState({
            roleId: value,
        });
    };

    _handlePermissionLevelChange = (e, { value }) => {
        this.setState({
            permissionLevel: value,
        });
    };


    render() {
        const { isCurrentUser, userDict, userId } = this.props;
        const { email, name } = userDict[userId];
        const { roleId, permissionLevel, roleOptions, permissionOptions } = this.state;
        const permissionLevelModAdmin = permissionLevel >= PermissionLevelEnum.MODERATOR ? permissionLevel : undefined;

        return (
            <Modal 
                open
                size="tiny"
            >
                <Modal.Header>Rechte/Rollen ändern</Modal.Header>
                <Modal.Content>
                    <NameDiv>
                        {name}
                        <span>{email}</span>
                    </NameDiv>
                    <Form>
                        <Form.Field>
                            <Dropdown
                                placeholder='Keine Rolle'
                                clearable
                                fluid
                                selection
                                onChange={this._handleRoleChange}
                                value={roleId}
                                options={roleOptions}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                placeholder='Keine Berechtigungen'
                                clearable
                                fluid
                                selection
                                onChange={this._handlePermissionLevelChange}
                                disabled={isCurrentUser} // disallow current user to change his/her own permissions
                                value={permissionLevelModAdmin}
                                options={permissionOptions}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        content="Abbrechen"
                        onClick={this._handleCancelClick}
                    />
                    <Button
                        positive
                        disabled={false}
                        content="Speichern"
                        onClick={this._handleSaveClick}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        activeEventId: getActiveEventId(state.events),
        roleList: getRoleList(state.eventInfo),
        userDict: getUserDict(state.eventInfo),
        isCurrentUser: getUserId(state.user) === props.userId,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        eventsActions: bindActionCreators(eventsActions, dispatch),
    };
}


const ConnectedManageUserRoleModal = connect(mapStateToProps, mapDispatchToProps)(ManageUserRoleModal);
export { ConnectedManageUserRoleModal as ManageUserRoleModal };