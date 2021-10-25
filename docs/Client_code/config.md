<a id="config"></a>

## config
Configuration values.
IMPORTANT: Only string values are supported!

**Kind**: global constant  

* [config](#config)
    * [.TABLE_API_DISCONNECT_TIMEOUT](#config46table95api95disconnect95timeout) : <code>string</code>
    * [.TABLE_API_REQUEST_TIMEOUT](#config46table95api95request95timeout) : <code>string</code>
    * [.TABLE_API_URL](#config46table95api95url) : <code>string</code>
    * [.TABLE_DESKTOP_APP_BROADCAST_IMAGE_INTERVAL](#config46table95desktop95app95broadcast95image95interval) : <code>string</code>
    * [.TABLE_DESKTOP_APP_SCREENSHOT_MAX_RES](#config46table95desktop95app95screenshot95max95res) : <code>string</code>
    * [.TABLE_HTML_CONTACT_INFOS](#config46table95html95contact95infos) : <code>string</code>
    * [.TABLE_HTML_TERMS_OF_SERVICE](#config46table95html95terms95of95service) : <code>string</code>
    * [.TABLE_INPUT_IMAGE_MAX_RES](#config46table95input95image95max95res) : <code>string</code>
    * [.TABLE_SAVE_STATE_DEBOUNCE_TIME](#config46table95save95state95debounce95time) : <code>string</code>

<a id="config46table95api95disconnect95timeout"></a>

### config.TABLE\_API\_DISCONNECT\_TIMEOUT : <code>string</code>
Timeout in ms for api disconnect.
Defaults to 15000.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95api95request95timeout"></a>

### config.TABLE\_API\_REQUEST\_TIMEOUT : <code>string</code>
Timeout in ms for a single api request.
Defaults to 30000.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95api95url"></a>

### config.TABLE\_API\_URL : <code>string</code>
URL to Websocket-API.
Defaults to /api.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95desktop95app95broadcast95image95interval"></a>

### config.TABLE\_DESKTOP\_APP\_BROADCAST\_IMAGE\_INTERVAL : <code>string</code>
Interval in ms for capturing screenshots during broadcast. 
Defaults to 15000.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95desktop95app95screenshot95max95res"></a>

### config.TABLE\_DESKTOP\_APP\_SCREENSHOT\_MAX\_RES : <code>string</code>
Max. width or height of captured screenshot in px. 
     TABLE_* If screenshot is too large, it will be scaled down til width and height
are less or equal to the specified value.
Defaults to 1200.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95html95contact95infos"></a>

### config.TABLE\_HTML\_CONTACT\_INFOS : <code>string</code>
HTML text for contact page.
Requires override.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95html95terms95of95service"></a>

### config.TABLE\_HTML\_TERMS\_OF\_SERVICE : <code>string</code>
HTML text for terms of service page.
Requires override.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95input95image95max95res"></a>

### config.TABLE\_INPUT\_IMAGE\_MAX\_RES : <code>string</code>
Maximum resolution (width or height) in px for an attached image.
Larger pictures get resized to this value.
Defaults to 1200.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95save95state95debounce95time"></a>

### config.TABLE\_SAVE\_STATE\_DEBOUNCE\_TIME : <code>string</code>
Time intervall in ms that state-save operations 
(save state to localStorage) can be performed at max rate.  
Defaults to 500.

**Kind**: static property of [<code>config</code>](#config)  
