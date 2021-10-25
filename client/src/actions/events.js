import * as eventsActionTypes from '../actiontypes/events';

import { getActiveEventId } from '../reducers/events';

/**
 * Creates action for changing an events name/title.
 * @function
 * @param {string} eventId id of event
 * @param {string} newName name/title to change to
 * @returns {object} action
 */
export function changeEventName(eventId, newName) {
    return ({
        type: 'apiCall',
        apiCall: { 
            types: [eventsActionTypes.CHANGE_EVENT_NAME_REQUEST,
                eventsActionTypes.CHANGE_EVENT_NAME_SUCCESS,
                eventsActionTypes.CHANGE_EVENT_NAME_FAILURE],
            call: (api) => api.request('events/changeEventName', { eventId, newName })
        },
    });
}


/**
 * Creates action for changing an events roleList.
 * @function
 * @param {string} eventId id of event
 * @param {RoleList} roleList RoleList to change to
 * @returns {object} action
 */
 export function changeEventRoleList(eventId, roleList) {
    return ({
        type: 'apiCall',
        apiCall: { 
            types: [eventsActionTypes.CHANGE_EVENT_ROLE_LIST_REQUEST,
                eventsActionTypes.CHANGE_EVENT_ROLE_LIST_SUCCESS,
                eventsActionTypes.CHANGE_EVENT_ROLE_LIST_FAILURE],
            call: (api) => api.request('events/changeEventRoleList', { eventId, roleList })
        },
    });
}


/**
 * Creates action for changing an events roleList.
 * @function
 * @param {string} eventId id of event
 * @param {string} userId id of user subject to change
 * @param {PermissionLevelEnum} permissionLevel new permissionLevel for user
 * @param {(string|null)} roleId id of new role for user. null or '' removes current rule
 * @returns {object} action
 */
 export function changeUserPermissionLevelAndRole(eventId, userId, permissionLevel, roleId) {
    return ({
        type: 'apiCall',
        apiCall: { 
            types: [eventsActionTypes.CHANGE_USER_PERMISSION_LEVEL_AND_ROLE_REQUEST,
                eventsActionTypes.CHANGE_USER_PERMISSION_LEVEL_AND_ROLE_SUCCESS,
                eventsActionTypes.CHANGE_USER_PERMISSION_LEVEL_AND_ROLE_FAILURE],
            call: (api) => api.request('events/changeUserPermissionLevelAndRole', { eventId, userId, permissionLevel, roleId })
        },
    });
}


/**
 * Creates action for subscribing to full EventDict (containing all events).
 * @function
 * @returns {object} action
 */
export function subscribeFullEventDict() {
    return ({
        type: 'apiCall',
        apiCall: {
            key: 'subscribeFullEventDict',
            types: [eventsActionTypes.SUBSCRIBE_FULL_EVENT_DICT_REQUEST,
                eventsActionTypes.SUBSCRIBE_FULL_EVENT_DICT_SUCCESS,
                eventsActionTypes.SUBSCRIBE_FULL_EVENT_DICT_FAILURE],
            call: (api) => api.request('events/subscribeFullEventDict')
        }
    });
}


/**
 * Creates action for unsubscribing from full EventDict.
 * @function
 * @returns {object} action
 */
export function unsubscribeFullEventDict() {
    return ({
        type: 'apiCall',
        apiCall: {
            key: 'unsubscribeFullEventDict', // should not be blocked by subscribe event
            types: [eventsActionTypes.UNSUBSCRIBE_FULL_EVENT_DICT_REQUEST,
                eventsActionTypes.UNSUBSCRIBE_FULL_EVENT_DICT_SUCCESS,
                eventsActionTypes.UNSUBSCRIBE_FULL_EVENT_DICT_FAILURE],
            call: (api) => api.request('events/unsubscribeFullEventDict')
        }
    });
}


/**
 * Creates action for joining an event.
 * @function
 * @param {string} eventId id of event to join
 * @returns {object} action
 */
export function joinEvent(eventId) {
    return ({
        type: 'apiCall',
        apiCall: { 
            types: [eventsActionTypes.JOIN_EVENT_REQUEST,
                eventsActionTypes.JOIN_EVENT_SUCCESS,
                eventsActionTypes.JOIN_EVENT_FAILURE],
            call: (api) => api.request('events/joinEvent', { eventId })
        },
        eventId
    });
}


/**
 * Creates action for leaving an event.
 * @function
 * @param {string} eventId id of event to leave
 * @returns {object} action
 */
export function leaveEvent(eventId) {
    return ({
        type: 'apiCall',
        apiCall: {
            types: [eventsActionTypes.LEAVE_EVENT_REQUEST,
                eventsActionTypes.LEAVE_EVENT_SUCCESS,
                eventsActionTypes.LEAVE_EVENT_FAILURE],
            call: (api) => api.request('events/leaveEvent', { eventId })
        },
        eventId
    });
}


/**
 * Creates action for switching the active event.
 * @function
 * @param {string} eventId id of event to switch to
 * @returns {object} action
 */
export function switchActiveEvent(eventId) {
    return (dispatch, getState) => {
        if (getActiveEventId(getState().events) === eventId)
            return;
        dispatch({
            type: 'apiCall',
            apiCall: {
                key: 'switchActiveEvent',
                types: [eventsActionTypes.SWITCH_ACTIVE_EVENT_REQUEST, 
                    eventsActionTypes.SWITCH_ACTIVE_EVENT_SUCCESS, 
                    eventsActionTypes.SWITCH_ACTIVE_EVENT_FAILURE],
                call: (api) => api.request('events/switchActiveEvent', { eventId })
            },
            eventId
        });
    };
}


/**
 * Creates action for updating the EventDict.
 * @function
 * @param {EventDict} eventDict updated EventDict
 * @returns {object} action
 */
export function updateEventDict(eventDict) {
    return ({
        type: eventsActionTypes.UPDATE_EVENT_DICT,
        eventDict
    });
}

