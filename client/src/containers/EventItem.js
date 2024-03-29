import * as eventsActions from '../actions/events';

import { getActiveEventId, getEventName } from '../reducers/events';

import { InnerSegmentWithIcon } from '../components/InnerSegmentWithIcon';
import { LinkSegment } from '../components/LinkSegment';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EventItem extends React.Component {
    /**
     * @property {string} eventId id of event
     * @property {string} eventName name/title of event
     */
    static get propTypes() {
        return {
            eventId: PropTypes.string.isRequired,
            eventName: PropTypes.string.isRequired,
        };
    };

    // static get defaultProps() {
    //     return { };
    // };

    // static get contextTypes() {
    //     return {
    //         router: PropTypes.object.isRequired
    //     };
    // }


    render() {
        const {eventId, eventName} = this.props;
        
        return (
            <LinkSegment
                to={`/${eventId}`}
            >
                <InnerSegmentWithIcon
                    icon='chevron right'
                >
                    {eventName}
                </InnerSegmentWithIcon>
            </LinkSegment>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        eventName: getEventName(state.events, props.eventId),
        isActive: props.eventId === getActiveEventId(state.events),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        eventsActions: bindActionCreators(eventsActions, dispatch),
    };
}


const ConnectedEventItem = connect(mapStateToProps, mapDispatchToProps)(EventItem);
export { ConnectedEventItem as EventItem };
