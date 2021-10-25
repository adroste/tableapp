<a id="isadminloggedin"></a>

## isAdminLoggedIn(state) ⇒ <code>boolean</code>
Selector to select state if logged in as (super) admin from admin-state.

**Kind**: global function  
**Returns**: <code>boolean</code> - indicates if initial load of comments is pending  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>AdminState</code>](#adminstate) | admin-state |

<a id="getcreateeventerror"></a>

## getCreateEventError(state) ⇒ <code>object</code>
Selector to select error state for create event action from admin-state.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>AdminState</code>](#adminstate) | admin-state |

<a id="getcreateeventsuccess"></a>

## getCreateEventSuccess(state) ⇒ <code>object</code>
Selector to select success state for create event action from admin-state.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>AdminState</code>](#adminstate) | admin-state |

<a id="adminstate"></a>

## AdminState : <code>object</code>
Shape of admin reducers state.
Default values are the initial state.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [commentDict] | <code>CommentDict</code> | <code>{}</code> | dictionary of comments |
| [initialLoadPending] | <code>boolean</code> | <code>true</code> | indicates if initial load of comments is pending |
| [subscribedEntryId] | <code>string</code> &#124; <code>null</code> | <code>null</code> | id of entry which comments are loaded/subscribed |

