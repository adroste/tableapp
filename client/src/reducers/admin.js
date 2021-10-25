import * as adminActionTypes from '../actiontypes/admin';

/**
 * Shape of admin reducers state.
 * Default values are the initial state.
 * @typedef {object} AdminState
 * @property {CommentDict} [commentDict={}] dictionary of comments
 * @property {boolean} [initialLoadPending=true] indicates if initial load of comments is pending
 * @property {(string|null)} [subscribedEntryId=null] id of entry which comments are loaded/subscribed
 */
const initialState = {
    loggedIn: false,
    createEventError: null,
    createEventSuccess: null,
};

export const admin = (state = initialState, action) => {
    switch (action.type) {

        case adminActionTypes.ADMIN_LOGIN_SUCCESS:
            return { 
                ...state,
                loggedIn: true,
            };

        case adminActionTypes.ADMIN_LOGIN_FAILURE:
        case adminActionTypes.ADMIN_LOGIN_REQUEST:
            return { 
                ...state,
                loggedIn: false,
            };

        case adminActionTypes.CREATE_NEW_EVENT_REQUEST:
            return {
                ...state,
                createEventError: null,
                createEventSuccess: null,
            };
        
        case adminActionTypes.CREATE_NEW_EVENT_FAILURE:
            return {
                ...state,
                createEventError: action.error,
                createEventSuccess: null,
            };

        case adminActionTypes.CREATE_NEW_EVENT_SUCCESS:
            return {
                ...state,
                createEventError: null,
                createEventSuccess: action.result,
            };

        default:
            return state;
    }
}


// selectors

/**
 * Selector to select state if logged in as (super) admin from admin-state.
 * @function
 * @param {AdminState} state admin-state
 * @returns {boolean} indicates if initial load of comments is pending
 */
export const isAdminLoggedIn = (state) =>
    state.loggedIn;


/**
 * Selector to select error state for create event action from admin-state.
 * @function
 * @param {AdminState} state admin-state
 * @returns {object} 
 */
export const getCreateEventError = (state) =>
    state.createEventError;


/**
 * Selector to select success state for create event action from admin-state.
 * @function
 * @param {AdminState} state admin-state
 * @returns {object} 
 */
export const getCreateEventSuccess = (state) =>
    state.createEventSuccess;