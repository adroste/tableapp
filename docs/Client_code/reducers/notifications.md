<a id="notifications"></a>

## notifications(state, action)
notifications-reducer

**Kind**: global function  

| Param | Type |
| --- | --- |
| state | [<code>NotificationsState</code>](#notificationsstate) | 
| action | <code>object</code> | 

<a id="getnotificationbyid"></a>

## getNotificationById(state, id) ⇒ <code>Notification</code>
Selector to select notification by id from notifications-state.

**Kind**: global function  
**Returns**: [<code>Notification</code>](#notification) - notification  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>NotificationsState</code>](#notificationsstate) | notifications-state |
| id | <code>string</code> | id of notification |

<a id="getnotificationdict"></a>

## getNotificationDict(state) ⇒ <code>NotificationDict</code>
Selector to select notification-dict from notifications-state.

**Kind**: global function  
**Returns**: [<code>NotificationDict</code>](#notificationdict) - notification dict  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>NotificationsState</code>](#notificationsstate) | notifications-state |

<a id="getnotificationidssorted"></a>

## getNotificationIdsSorted(state) ⇒ <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code>
Selector to retrieve sorted list of notification ids from notifications-state.
Sorted by timestamp desc.
List gets cached and is only re-generated if notificationDict in state changes.

**Kind**: global function  
**Returns**: <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> - array of notification ids sorted by timestamp desc  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>NotificationsState</code>](#notificationsstate) | notifications-state |

<a id="hasunreadnotifications"></a>

## hasUnreadNotifications(state) ⇒ <code>boolean</code>
Selector to state whether user has unread notifications from notifications-state.

**Kind**: global function  
**Returns**: <code>boolean</code> - indicates whether user has unread notifications  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>NotificationsState</code>](#notificationsstate) | notifications-state |

<a id="notification"></a>

## Notification : <code>object</code>
A notification object.

**Kind**: global typedef  
**Todo**

- [ ] document properties

<a id="notificationdict"></a>

## NotificationDict : <code>object</code>
Dictionary of notifications.

dict[key] = value:
* key := id of notification
* value := [Notification](#notification)

**Kind**: global typedef  
<a id="notificationsstate"></a>

## NotificationsState : <code>object</code>
Shape of notifications reducers state.
Default values are the initial state.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [notificationDict] | [<code>NotificationDict</code>](#notificationdict) | <code>{}</code> | dictionary of notifications |

