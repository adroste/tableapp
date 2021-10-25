<a id="markallunreadnotificationsasread"></a>

## markAllUnreadNotificationsAsRead() ⇒ <code>object</code>
Creates an action for marking all unread notification as read by user.

**Kind**: global function  
**Returns**: <code>object</code> - action  
<a id="readnotification"></a>

## readNotification(notificationId, inAppClick) ⇒ <code>object</code>
Creates an action for marking/logging an notification as read by user.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| notificationId | <code>string</code> | id of notification |
| inAppClick | <code>boolean</code> | indicates if read was triggered by clicking in-app notification or indirect (e.g. mail-link) |

<a id="updatenotificationdict"></a>

## updateNotificationDict(notificationDict) ⇒ <code>object</code>
Creates action for updating the NotificationDict.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| notificationDict | <code>NotificationDict</code> | updated NotificationDict |

