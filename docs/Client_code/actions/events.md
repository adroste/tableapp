<a id="changeeventname"></a>

## changeEventName(eventId, newName) ⇒ <code>object</code>
Creates action for changing an events name/title.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | id of event |
| newName | <code>string</code> | name/title to change to |

<a id="changeeventrolelist"></a>

## changeEventRoleList(eventId, roleList) ⇒ <code>object</code>
Creates action for changing an events roleList.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | id of event |
| roleList | <code>RoleList</code> | RoleList to change to |

<a id="changeuserpermissionlevelandrole"></a>

## changeUserPermissionLevelAndRole(eventId, userId, permissionLevel, roleId) ⇒ <code>object</code>
Creates action for changing an events roleList.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | id of event |
| userId | <code>string</code> | id of user subject to change |
| permissionLevel | <code>PermissionLevelEnum</code> | new permissionLevel for user |
| roleId | <code>string</code> &#124; <code>null</code> | id of new role for user. null or '' removes current rule |

<a id="subscribefulleventdict"></a>

## subscribeFullEventDict() ⇒ <code>object</code>
Creates action for subscribing to full EventDict (containing all events).

**Kind**: global function  
**Returns**: <code>object</code> - action  
<a id="unsubscribefulleventdict"></a>

## unsubscribeFullEventDict() ⇒ <code>object</code>
Creates action for unsubscribing from full EventDict.

**Kind**: global function  
**Returns**: <code>object</code> - action  
<a id="joinevent"></a>

## joinEvent(eventId) ⇒ <code>object</code>
Creates action for joining an event.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | id of event to join |

<a id="leaveevent"></a>

## leaveEvent(eventId) ⇒ <code>object</code>
Creates action for leaving an event.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | id of event to leave |

<a id="switchactiveevent"></a>

## switchActiveEvent(eventId) ⇒ <code>object</code>
Creates action for switching the active event.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | id of event to switch to |

<a id="updateeventdict"></a>

## updateEventDict(eventDict) ⇒ <code>object</code>
Creates action for updating the EventDict.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| eventDict | <code>EventDict</code> | updated EventDict |

