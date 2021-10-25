import { admin } from './admin';
import { api } from './api';
import { combineReducers } from 'redux';
import { comments } from './comments';
import { desktopApp } from './desktopApp';
import { entries } from './entries';
import { eventInfo } from './eventInfo';
import { eventScreenshots } from './eventScreenshots';
import { events } from './events';
import { images } from './images';
import { notifications } from './notifications';
import { user } from './user';

/**
 * root-reducer
 * 
 * combines the following reducers into a single one:
 * * admin
 * * api
 * * comments
 * * desktopApp
 * * entries
 * * eventInfo
 * * events
 * * eventScreenshots
 * * images
 * * user
 * @name reducer
 * @function
 * @param {object} state
 * @param {object} action
 */
export default combineReducers({
    admin,
    api,
    comments,
    desktopApp,
    entries,
    eventInfo,
    events,
    eventScreenshots,
    images,
    notifications,
    user,
});
