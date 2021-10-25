import * as eventsActions from '../actions/events';
import * as utils from '../utils';

import { Button, Header, Label, List, Segment } from 'semantic-ui-react';

import { COLORS } from '../colors';
import { Confirm } from '../components/Confirm';
import { DefineRoleModal } from '../components/DefineRoleModal';
import { FormFieldAction } from '../components/FormFieldAction';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import { getActiveEventId } from '../reducers/events';
import { getRoleList } from '../reducers/eventInfo';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components';

const ListItemContentFlex = styled(List.Content)`
    display: flex;
    align-items: center;
`;


const Stretch = styled.span`
    flex: 1;
`;


class DefineRolesForm extends React.Component {
    /**
     * @property {object[]} roleList array of roles sorted by priority (injected by redux)
     */
    static get propTypes() {
        return {
            roleList: PropTypes.array.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    constructor(props) {
        super(props);

        this.state = {
            isChangeConfirmOpen: false,
            // editId defines, if edit-modal is shown (empty editId => no modal)
            editId: '',
            roleList: cloneDeep(props.roleList) || [],
        };
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.roleList !== this.props.roleList) {
            this.setState({
                roleList: cloneDeep(this.props.roleList) || [],
            });
        }
    }


    getUnusedColor = () => {
        const { roleList } = this.state;

        for (let color of COLORS) {
            let isInUse = false;
            for (let role of roleList) {
                if (role.color === color) {
                    isInUse = true;
                    break;
                }
            }
            if (!isInUse)
                return color;
        }

        // if every color is used, take red
        return 'red';
    };


    handleAddRoleClick = e => {
        this.setState({
            editId: utils.generateUUID() // set editId to newly generated (fresh) id
        });
    };


    handleItemEditClick = id => e => {
        this.setState({
            editId: id,
        });
    };


    handleItemDeleteClick = id => e => {
        const newRoleList = cloneDeep(this.state.roleList);
        const foundRoleIndex = newRoleList.findIndex((cur) => cur.id === id);
        if (foundRoleIndex === -1)
            return;
        newRoleList.splice(foundRoleIndex, 1);

        this.setState({
            roleList: newRoleList,
        });
    };


    handleItemDecreasePriorityClick = id => e => {
        const newRoleList = cloneDeep(this.state.roleList);
        const foundRoleIndex = newRoleList.findIndex((cur) => cur.id === id);
        if (foundRoleIndex === -1 || foundRoleIndex === newRoleList.length - 1)
            return;
        const item = newRoleList[foundRoleIndex];
        newRoleList.splice(foundRoleIndex, 1);
        newRoleList.splice(foundRoleIndex + 1, 0, item);

        this.setState({
            roleList: newRoleList,
        });
    };


    handleItemIncreasePriorityClick = id => e => {
        const newRoleList = cloneDeep(this.state.roleList);
        const foundRoleIndex = newRoleList.findIndex((cur) => cur.id === id);
        if (foundRoleIndex === -1 || foundRoleIndex === 0)
            return;
        const item = newRoleList[foundRoleIndex];
        newRoleList.splice(foundRoleIndex, 1);
        newRoleList.splice(foundRoleIndex - 1, 0, item);

        this.setState({
            roleList: newRoleList,
        });
    };


    handleModalCancelClick = e => {
        this.setState({
            editId: '',
        });
    };


    handleModalSaveClick = (e, data) => {
        const { editId, roleList } = this.state;
        if (!editId)
            return '';

        const newRoleList = cloneDeep(roleList);
        const { name, color } = data;
        const foundRole = newRoleList.find((cur) => cur.id === editId);
        if (foundRole) {
            foundRole.name = name;
            foundRole.color = color;
        } else {
            newRoleList.push({
                id: editId,
                name,
                color,
            });
        }

        this.setState({
            editId: '',
            roleList: newRoleList,
        });
    };


    handleResetClick = () => {
        this.setState({
            roleList: cloneDeep(this.props.roleList) || [],
        });
    };


    handleSaveClick = () => {
        this.setState({
            isChangeConfirmOpen: true,
        });
    };


    handleChangeConfirmCancelClick = () => {
        this.setState({
            isChangeConfirmOpen: false,
        });
    };


    handleChangeConfirmAcceptClick = () => {
        this.setState({
            isChangeConfirmOpen: false,
        });
        this.props.eventsActions.changeEventRoleList(this.props.activeEventId, this.state.roleList);
    };


    renderListItems = () => {
        const { roleList } = this.state;

        return roleList.map((cur, i) => {
            const { id, name, color } = cur;

            return (
                <List.Item key={id}>
                    <ListItemContentFlex>
                        <Label
                            content={name}
                            color={color}
                        />
                        <Stretch />
                        <Button.Group size="mini">
                            <Button
                                data-id={id}
                                disabled={i === 0}
                                icon="arrow up"
                                onClick={this.handleItemIncreasePriorityClick(id)}
                            />
                            <Button
                                disabled={i === roleList.length - 1}
                                icon="arrow down"
                                onClick={this.handleItemDecreasePriorityClick(id)}
                            />
                            <Button
                                icon="edit"
                                onClick={this.handleItemEditClick(id)}
                            />
                            <Button
                                icon="delete"
                                onClick={this.handleItemDeleteClick(id)}
                            />
                        </Button.Group>
                    </ListItemContentFlex>
                </List.Item>
            );
        });
    };


    renderModal = () => {
        const { editId, roleList } = this.state;

        // if no edit id is set dont show modal
        if (!editId)
            return '';

        let name, color;
        const foundRole = roleList.find((cur) => cur.id === editId);
        // check if role with editId exists
        if (foundRole) {
            // if so: load values
            name = foundRole.name;
            color = foundRole.color;
        } else {
            // if not: editId refers to a new role
            name = '';
            color = this.getUnusedColor();
        }

        return (
            <DefineRoleModal
                defaultColor={color}
                defaultName={name}
                onCancelClick={this.handleModalCancelClick}
                onSaveClick={this.handleModalSaveClick}
            />
        );
    };


    render() {
        const { isChangeConfirmOpen, roleList } = this.state;
        const isUnchanged = isEqual(roleList, this.props.roleList);

        return (
            <Segment>
                <Header
                    content="Rollen definieren"
                />
                <List ordered>
                    {this.renderListItems()}
                </List>
                <Button
                    content="Rolle hinzufügen"
                    icon="add"
                    onClick={this.handleAddRoleClick}
                />
                {this.renderModal()}
                <FormFieldAction>
                    <Button
                        content="Zurücksetzen"
                        disabled={isUnchanged}
                        onClick={this.handleResetClick}
                    />
                    <Button
                        content="Speichern"
                        disabled={isUnchanged}
                        primary
                        onClick={this.handleSaveClick}
                    />
                </FormFieldAction>
                <Confirm
                    confirmText='Rollen speichern'
                    content={
                        <div>
                            <p>Willst du die Änderung der Rollen wirklich speichern?</p>
                        </div>
                    }
                    hasCancel
                    headerText='Rollen neu definieren'
                    isOpen={isChangeConfirmOpen}
                    onCancel={this.handleChangeConfirmCancelClick}
                    onConfirm={this.handleChangeConfirmAcceptClick}
                />
            </Segment>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        activeEventId: getActiveEventId(state.events),
        roleList: getRoleList(state.eventInfo),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        eventsActions: bindActionCreators(eventsActions, dispatch),
    };
}


const ConnectedDefineRolesForm = connect(mapStateToProps, mapDispatchToProps)(DefineRolesForm);
export { ConnectedDefineRolesForm as DefineRolesForm };