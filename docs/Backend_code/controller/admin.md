<a id="module95admincontroller"></a>

## adminController
Controller for admin access.


* [adminController](#module95admincontroller)
    * [.checkAdminPassword(password)](#module95admincontroller46checkadminpassword) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;boolean&gt;</code>
    * [.createNewEvent(userId, title, customId)](#module95admincontroller46createnewevent) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;ObjectID&gt;</code>

<a id="module95admincontroller46checkadminpassword"></a>

### adminController.checkAdminPassword(password) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;boolean&gt;</code>
Checks the admin password

**Kind**: static method of [<code>adminController</code>](#module95admincontroller)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;boolean&gt;</code> - resolves to true or false  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | password to check |

<a id="module95admincontroller46createnewevent"></a>

### adminController.createNewEvent(userId, title, customId) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;ObjectID&gt;</code>
Insert new event into db.

**Kind**: static method of [<code>adminController</code>](#module95admincontroller)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;ObjectID&gt;</code> - resolves to ObjectID of inserted event  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | userId of event administrator |
| title | <code>string</code> | title of event |
| customId | <code>ObjectID</code> &#124; <code>null</code> | custom id of event. null will generate a new id |

