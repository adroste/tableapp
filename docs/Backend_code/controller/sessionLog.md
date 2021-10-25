<a id="module95sessionlogcontroller"></a>

## sessionLogController
Controller for user session loggin.

<a id="module95sessionlogcontroller46savesessioninfo"></a>

### sessionLogController.saveSessionInfo(userId, fromTimestamp, toTimestamp, sessionToken, [ip], [userAgent]) ⇒ <code>Promise</code>
Saves sessionInfo for a user. Used for tracking and analysis.

**Kind**: static method of [<code>sessionLogController</code>](#module95sessionlogcontroller)  
**Returns**: <code>Promise</code> - indicates success  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | id of user |
| fromTimestamp | <code>number</code> | login/auth timestamp |
| toTimestamp | <code>number</code> | logout/disconnect timestamp |
| sessionToken | <code>string</code> | used sessionToken |
| [ip] | <code>string</code> | ip-address |
| [userAgent] | <code>string</code> | userAgent of users browser |

