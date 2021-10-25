import * as adminActionTypes from '../actiontypes/admin';

/**
 * Creates action for login as admin.
 * @function
 * @param {string} password password 
 * @returns {object} action
 */
export function adminLogin(password) {
    return ({
        type: 'apiCall',
        apiCall: {
            types: [adminActionTypes.ADMIN_LOGIN_REQUEST,
                adminActionTypes.ADMIN_LOGIN_SUCCESS,
                adminActionTypes.ADMIN_LOGIN_FAILURE],
            call: (api) => api.request('admin/adminLogin', { password })
        }
    });
}


/**
 * Creates action for creating a new event.
 * @function
 * @param {string} title title of event 
 * @param {(string|null)} customId custom event id. null or '' will create a new id
 * @returns {object} action
 */
export function createNewEvent(title, customId) {
    return ({
        type: 'apiCall',
        apiCall: {
            types: [adminActionTypes.CREATE_NEW_EVENT_REQUEST,
                adminActionTypes.CREATE_NEW_EVENT_SUCCESS,
                adminActionTypes.CREATE_NEW_EVENT_FAILURE],
            call: (api) => api.request('admin/createNewEvent', { title, customId })
        }
    });
}