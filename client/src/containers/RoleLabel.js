import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getRole } from '../reducers/eventInfo';
import styled from 'styled-components';

const CustomLabel = styled(Label).attrs({
    size: 'mini'
})`
    margin: 0.3em !important;
`;


class RoleLabel extends React.Component {
    /**
     * @property {String} [roleId] id of corresponding role
     * @property {String} [roleInfo] roleInfo object (injected by redux via roleId)
     */
    static get propTypes() {
        return {
            roleId: PropTypes.string,
            roleInfo: PropTypes.object,
        };
    };

    static get defaultProps() {
        return {};
    };


    render() {
        const { roleInfo } = this.props;
        const color = roleInfo ? roleInfo.color : undefined;
        const name = roleInfo ? roleInfo.name : 'Teilnehmer';

        return (
            <CustomLabel
                color={color}
                content={name}
            />
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        roleInfo: getRole(state.eventInfo, props.roleId),
    }
};


const ConnectedRoleLabel = connect(mapStateToProps)(RoleLabel);
export { ConnectedRoleLabel as RoleLabel };