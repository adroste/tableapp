import { Button, Divider, Form, Header, List, Segment } from 'semantic-ui-react';
import { getRoleList, getUserDict } from '../reducers/eventInfo';

import { ManageUserRoleModal } from './ManageUserRoleModal';
import { PermissionLevelEnum } from '../PermissionLevelEnum';
import PropTypes from 'prop-types';
import React from 'react';
import { RoleLabel } from './RoleLabel';
import { SearchPerson } from './SearchPerson';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ControlsWrapper = styled.div`
    display: flex;
    align-items: center;
`;


const Stretch = styled.span`
    flex: 1;
`;


const NameDiv = styled.div`
    font-size: 14px;
    word-wrap: break-word;
    margin-right: .3em;

    & > span {
        font-size: 12px;
        color: rgba(0,0,0,.6);
        display: block;
    }
`;


class ManageRolesForm extends React.Component {
    /**
     */
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
            // editId defines, if edit-modal is shown (empty editId => no modal)
            editId: '',
        };
    }


    _handleEditUserClick = userId => e => {
        this.setState({
            editId: userId,
        });
    };


    _handleSearchResultSelect = (e, userId) => {
        this.setState({
            editId: userId,
        });
    };


    _handleModalClose = () => {
        this.setState({
            editId: '',
        });
    };


    _renderListItems = () => {
        // TODO move following part outside of render to improve rerender performance
        const {userDict, roleList} = this.props;
        const roleDict = roleList.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});

        const admins = [];
        const mods = [];
        const others = [];

        Object.keys(userDict).forEach((userId) => {
            const permissionLevel = userDict[userId].permissionLevel;
            if (permissionLevel >= PermissionLevelEnum.ADMINISTRATOR) {
                admins.push(userId);
            } else if (permissionLevel >= PermissionLevelEnum.MODERATOR) {
                mods.push(userId);
            } else if (roleDict[userDict[userId].roleId]) {
                others.push(userId);
            }
        });

        const compareFunc = (a, b) => {
            const nameA = userDict[a].name;
            const nameB = userDict[b].name;
            if (nameA < nameB) 
                return -1;
            if (nameA > nameB) 
                return 1;
            return 0;
        };

        admins.sort(compareFunc);
        mods.sort(compareFunc);
        others.sort(compareFunc);

        const view = [
            { users: admins, text: "Administratoren" },
            { users: mods, text: "Moderatoren" },
            { users: others, text: "Andere" },
        ]

        return view.map((cur, i) => {
            return [
                <Divider horizontal content={cur.text} key={`divider_${i}`}/>,     
                ...cur.users.map((userId) => {
                    const user = userDict[userId];
                    return (
                        <List.Item key={userId}>
                            <List.Content>
                                <NameDiv>
                                    {user.name}
                                    <span>{user.email}</span>
                                </NameDiv>
                                <ControlsWrapper>
                                <RoleLabel
                                    roleId={user.roleId}
                                />
                                <Stretch/>
                                <Button
                                    icon="edit"
                                    size="mini"
                                    onClick={this._handleEditUserClick(userId)}
                                />
                                </ControlsWrapper>
                            </List.Content>
                        </List.Item>
                    );
                }),
            ]
        });
    };

    _renderModal() {
        const { editId } = this.state;
        if (!editId)
            return '';

        return (
            <ManageUserRoleModal
                userId={editId}
                onClose={this._handleModalClose}
            />
        );
    }


    render() {
        return (
            <Form
                as={Segment}
            >
                <Form.Field>
                    <Header 
                        content="Rechte/Rollen verwalten"
                    />
                </Form.Field>
                <Form.Field>
                    <SearchPerson
                        onResultSelect={this._handleSearchResultSelect}
                    />
                </Form.Field>
                <Form.Field>
                    <List>
                        {this._renderListItems()}              
                    </List>
                </Form.Field>
                {this._renderModal()}
            </Form>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        roleList: getRoleList(state.eventInfo),
        userDict: getUserDict(state.eventInfo),
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        // TODO
    };
}


const ConnectedManageRolesForm = connect(mapStateToProps, mapDispatchToProps)(ManageRolesForm);
export { ConnectedManageRolesForm as ManageRolesForm };