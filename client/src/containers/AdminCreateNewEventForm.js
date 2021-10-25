import * as adminActions from '../actions/admin';

import { Button, Form, Header, Input, Segment } from 'semantic-ui-react';
import { getCreateEventError, getCreateEventSuccess } from '../reducers/admin';

import { Confirm } from '../components/Confirm';
import { FormFieldAction } from '../components/FormFieldAction';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const MIN_TITLE_LENGTH = 8;


class AdminCreateNewEventForm extends React.Component {
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
            isChangeConfirmOpen: false,
            title: '',
            customId: '',
        };
    }


    componentDidUpdate(prevProps) {
        if (this.props.createEventError && this.props.createEventError !== prevProps.createEventError) {
            alert("FEHLER: Veranstaltung konnte nicht angelegt werden. Wahrscheinlich ist die CustomID keine gültige MongoDB ObjectID oder eine Veranstaltung mit dieser ID existiert bereits.");
        } else if (this.props.createEventSuccess && this.props.createEventSuccess !== prevProps.createEventSuccess) {
            alert("Erfolgreich angelegt");
            this.props.history.replace(`/${this.props.createEventSuccess}/eventsettings`);
        }
    }


    _handleCustomIdChange = (e, data) => {
        this.setState({
            customId: data.value
        });
    };


    _handleTitleChange = (e, data) => {
        this.setState({
            title: data.value
        });
    };


    _handleSaveClick = () => {
        this.setState({
            isChangeConfirmOpen: true
        });
    };


    _handleChangeConfirmCancelClick = () => {
        this.setState({
            isChangeConfirmOpen: false,
        });
    };


    _handleChangeConfirmAcceptClick = () => {
        this.setState({
            isChangeConfirmOpen: false,
        });
        this.props.adminActions.createNewEvent(this.state.title, this.state.customId);
    };


    render() {
        const { isChangeConfirmOpen, title, customId } = this.state;
        const isTitleLengthOk = typeof title === 'string' && title.length >= MIN_TITLE_LENGTH;

        return (
            <div>
                <Form
                    as={Segment}
                >
                    <Form.Field>
                        <Header 
                            content="Neue Veranstaltung anlegen"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            placeholder="Veranstaltungstitel..."
                            value={title}
                            onChange={this._handleTitleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            placeholder="Custom ID (leer lassen generiert neue ID)"
                            value={customId}
                            onChange={this._handleCustomIdChange}
                        />
                    </Form.Field>
                    <FormFieldAction>
                        <Button
                            content="Anlegen"
                            disabled={!isTitleLengthOk}
                            primary
                            onClick={this._handleSaveClick}
                        />
                    </FormFieldAction>
                </Form>
                <Confirm
                    confirmText='Anlegen'
                    content={
                        <div>
                            <p>Willst du die Veranstaltung "{title}" wirklich anlegen?</p>
                        </div>
                    }
                    hasCancel
                    headerText='Veranstaltung anlegen'
                    isOpen={isChangeConfirmOpen}
                    onCancel={this._handleChangeConfirmCancelClick}
                    onConfirm={this._handleChangeConfirmAcceptClick}
                />
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        createEventError: getCreateEventError(state.admin),
        createEventSuccess: getCreateEventSuccess(state.admin),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        adminActions: bindActionCreators(adminActions, dispatch),
    };
}


const ConnectedAdminCreateNewEventForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCreateNewEventForm));
export { ConnectedAdminCreateNewEventForm as AdminCreateNewEventForm };