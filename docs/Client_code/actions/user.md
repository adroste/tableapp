<a id="accepttos"></a>

## acceptTos() ⇒ <code>object</code>
Creates action for accepting terms of service.

**Kind**: global function  
**Returns**: <code>object</code> - action  
<a id="changeactivenotificationtypes"></a>

## changeActiveNotificationTypes(emailNotifications, inAppNotifications) ⇒ <code>object</code>
Creates action for changing the active notifications types for authenticated user.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| emailNotifications | <code>[ &#x27;Array&#x27; ].&lt;NotificationTypesEnum&gt;</code> | array of activated email notification types |
| inAppNotifications | <code>[ &#x27;Array&#x27; ].&lt;NotificationTypesEnum&gt;</code> | array of activated in-app notification types |

<a id="continuesession"></a>

## continueSession(sessionToken) ⇒ <code>object</code>
Creates action for continuing a session.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| sessionToken | <code>string</code> | sessionToken |

<a id="getactivenotificationtypes"></a>

## getActiveNotificationTypes() ⇒ <code>object</code>
Creates action for retrieving the active notifications types for authenticated user.

**Kind**: global function  
**Returns**: <code>object</code> - action  
<a id="login"></a>

## login(email, password) ⇒ <code>object</code>
Creates action for logging in.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | email of user |
| password | <code>string</code> | password of user |

<a id="logout"></a>

## logout() ⇒ <code>object</code>
Creates action for logging out.

**Kind**: global function  
**Returns**: <code>object</code> - action  
