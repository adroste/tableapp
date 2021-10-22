/**
 * Configuration values.
 * IMPORTANT: Only string values are supported!
 */
export const config = {

    /**
     * Timeout in ms for api disconnect.
     * Defaults to 15000.
     * @type {string}
     */
    TABLE_API_DISCONNECT_TIMEOUT: '15000',
    /**
     * Timeout in ms for a single api request.
     * Defaults to 30000.
     * @type {string}
     */
    TABLE_API_REQUEST_TIMEOUT: '30000',
    /**
     * URL to Websocket-API.
     * Defaults to /api.
     * @type {string}
     */
    TABLE_API_URL: '/api',

    /** 
     * Interval in ms for capturing screenshots during broadcast. 
     * Defaults to 15000.
     * @type {string}
     */
    TABLE_DESKTOP_APP_BROADCAST_IMAGE_INTERVAL: '15000',
    /** 
     * Max. width or height of captured screenshot in px. 
     TABLE_* If screenshot is too large, it will be scaled down til width and height
     * are less or equal to the specified value.
     * Defaults to 1200.
     * @type {string}
     */
    TABLE_DESKTOP_APP_SCREENSHOT_MAX_RES: '1200', // 1200px width or height

    /**
     * HTML text for contact page.
     * Requires override.
     * @type {string}
     */
    TABLE_HTML_CONTACT_INFOS: 'Unconfigured, please contact maintainer.',
    /**
     * HTML text for terms of service page.
     * Requires override.
     * @type {string}
     */
    TABLE_HTML_TERMS_OF_SERVICE: 'Unconfigured, please contact maintainer.',
    /**
     * Maximum resolution (width or height) in px for an attached image.
     * Larger pictures get resized to this value.
     * Defaults to 1200.
     * @type {string}
     */
    TABLE_INPUT_IMAGE_MAX_RES: '1200',
    /**
     * Time intervall in ms that state-save operations 
     * (save state to localStorage) can be performed at max rate.  
     * Defaults to 500.
     * @type {string}
     */
    TABLE_SAVE_STATE_DEBOUNCE_TIME: '500',

    ...window.customConfig
};
