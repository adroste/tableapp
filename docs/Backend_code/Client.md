<a id="client"></a>

## Client
Class representing a single client connection.

**Kind**: global class  

* [Client](#client)
    * [new Client(socket)](#new95client95new)
    * _instance_
        * [.connectTimestamp](#client43connecttimestamp) : <code>number</code>
        * [.id](#client43id) : <code>number</code>
        * [.ip](#client43ip) : <code>string</code>
        * [.userAgent](#client43useragent) : <code>string</code>
        * [._socket](#client4395socket) : <code>SocketIoConnection</code> ℗
        * [.activeEventId](#client43activeeventid) : <code>ObjectID</code> &#124; <code>null</code>
        * [.adminLoggedIn](#client43adminloggedin) : <code>boolean</code>
        * [.commentsSubscribedForEntryId](#client43commentssubscribedforentryid) : <code>ObjectID</code> &#124; <code>null</code>
        * [.entriesSubscription](#client43entriessubscription)
            * [.listSubscription](#client43entriessubscription46listsubscription) : <code>EntryListSubscription</code> &#124; <code>null</code>
            * [.subscribedIds](#client43entriessubscription46subscribedids) : <code>[ &#x27;Array&#x27; ].&lt;ObjectID&gt;</code>
        * [.hasAcceptedTos](#client43hasacceptedtos) : <code>boolean</code>
        * [.loginTimestamp](#client43logintimestamp) : <code>number</code> &#124; <code>null</code>
        * [.permissionLevel](#client43permissionlevel) : <code>PermissionLevelEnum</code>
        * [.sessionToken](#client43sessiontoken) : <code>string</code> &#124; <code>null</code>
        * [.subscribedFullEventDict](#client43subscribedfulleventdict) : <code>boolean</code>
        * [.userId](#client43userid) : <code>string</code> &#124; <code>null</code>
        * [._init()](#client4395init) ℗
        * [._handleDisconnect()](#client4395handledisconnect) ℗
        * [._setupAfterAuthentication(loginData)](#client4395setupafterauthentication) ⇒ <code>Promise</code> ℗
        * [._trackAndSaveUserSessionInfos()](#client4395trackandsaveusersessioninfos) ⇒ <code>Promise</code> ℗
        * [._handleAdminLogin(data)](#client4395handleadminlogin) ⇒ <code>Promise</code> ℗
        * [._handleCreateNewEvent(data)](#client4395handlecreatenewevent) ⇒ <code>Promise</code> ℗
        * [._handleChangeVoteForComment(data)](#client4395handlechangevoteforcomment) ⇒ <code>Promise</code> ℗
        * [._handleDeleteComment(data)](#client4395handledeletecomment) ⇒ <code>Promise</code> ℗
        * [._handlePostComment(data)](#client4395handlepostcomment) ⇒ <code>Promise</code> ℗
        * [._handleReadComment(data)](#client4395handlereadcomment) ⇒ <code>Promise</code> ℗
        * [._handleSubscribeCommentsForEntry(data)](#client4395handlesubscribecommentsforentry) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;CommentsController~CommentDict&gt;</code> ℗
        * [._handleUnsubscribeCommentsForEntry()](#client4395handleunsubscribecommentsforentry) ⇒ <code>Promise</code> ℗
        * [._handleBroadcastNewImage(data)](#client4395handlebroadcastnewimage) ⇒ <code>Promise</code> ℗
        * [._handleChangeBookmark(data)](#client4395handlechangebookmark) ⇒ <code>Promise</code> ℗
        * [._handleChangeFollow(data)](#client4395handlechangefollow) ⇒ <code>Promise</code> ℗
        * [._handleChangeVote(data)](#client4395handlechangevote) ⇒ <code>Promise</code> ℗
        * [._handleDeleteEntry(data)](#client4395handledeleteentry) ⇒ <code>Promise</code> ℗
        * [._handleLoadMoreEntries()](#client4395handleloadmoreentries) ⇒ [<code>[ &#x27;Promise&#x27; ].&lt;LoadMoreEntriesResult&gt;</code>](#client4646loadmoreentriesresult) ℗
        * [._handlePostEntry(data)](#client4395handlepostentry) ⇒ <code>Promise</code> ℗
        * [._handleReadEntry(data)](#client4395handlereadentry) ⇒ <code>Promise</code> ℗
        * [._handleSubscribeEntries(data)](#client4395handlesubscribeentries) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;EntriesController~EntryDict&gt;</code> ℗
        * [._handleSubscribeEntryList(data)](#client4395handlesubscribeentrylist) ℗
        * [._handleUnsubscribeEntries(data)](#client4395handleunsubscribeentries) ℗
        * [._handleUnsubscribeEntryList()](#client4395handleunsubscribeentrylist) ℗
        * [._handleChangeEventName(data)](#client4395handlechangeeventname) ⇒ <code>Promise</code> ℗
        * [._handleChangeEventRoleList(data)](#client4395handlechangeeventrolelist) ⇒ <code>Promise</code> ℗
        * [._handleChangeUserPermissionLevelAndRole(data)](#client4395handlechangeuserpermissionlevelandrole) ⇒ <code>Promise</code> ℗
        * [._handleSubscribeFullEventDict()](#client4395handlesubscribefulleventdict) ⇒ <code>Promise</code> ℗
        * [._handleUnsubscribeFullEventDict()](#client4395handleunsubscribefulleventdict) ℗
        * [._handleJoinEvent(data)](#client4395handlejoinevent) ⇒ <code>Promise</code> ℗
        * [._handleLeaveEvent(data)](#client4395handleleaveevent) ⇒ <code>Promise</code> ℗
        * [._handleSwitchActiveEvent(data)](#client4395handleswitchactiveevent) ⇒ <code>Promise</code> ℗
        * [._switchActiveEvent(newEventId)](#client4395switchactiveevent) ⇒ <code>Promise</code> ℗
        * [._handleLoadImages(data)](#client4395handleloadimages) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;ImagesController~GetImagesResult&gt;</code> ℗
        * [._handleMarkUnreadNotifications()](#client4395handlemarkunreadnotifications) ⇒ <code>Promise</code> ℗
        * [._handleReadNotification(data)](#client4395handlereadnotification) ⇒ <code>Promise</code> ℗
        * [._handleAcceptTos()](#client4395handleaccepttos) ⇒ <code>Promise</code> ℗
        * [._handleChangeActiveNotificationTypes(data)](#client4395handlechangeactivenotificationtypes) ⇒ <code>Promise</code> ℗
        * [._handleContinueSession(data)](#client4395handlecontinuesession) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;UserController~LoginData&gt;</code> ℗
        * [._handleGetActiveNotificationTypes()](#client4395handlegetactivenotificationtypes) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;object&gt;</code> ℗
        * [._handleLogin(data)](#client4395handlelogin) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;UserController~LoginData&gt;</code> ℗
        * [._handleLogout()](#client4395handlelogout) ℗
        * [.on(event, handler, [options])](#client43on)
        * [.emitUpdateCommentDict(commentDict)](#client43emitupdatecommentdict)
        * [.updateComment(entryId, commentId)](#client43updatecomment) ⇒ <code>Promise</code>
        * [.emitUpdateEntries(entryDict, [idList])](#client43emitupdateentries)
        * [.updateEntry(entryInfo)](#client43updateentry) ⇒ <code>Promise</code>
        * [.emitUpdateRoleList(roleList)](#client43emitupdaterolelist)
        * [.emitUpdateUserDict(userDict)](#client43emitupdateuserdict)
        * [.updateRoleList(eventId)](#client43updaterolelist) ⇒ <code>Promise</code>
        * [.emitUpdateEventDict(eventDict)](#client43emitupdateeventdict)
        * [.updateEventDict(eventIds)](#client43updateeventdict) ⇒ <code>Promise</code>
        * [.emitUpdateEventScreenshotIds(imageIds)](#client43emitupdateeventscreenshotids)
        * [.emitUpdateNotificationDict(clientNotificationDict)](#client43emitupdatenotificationdict)
    * _inner_
        * [~LoadMoreEntriesResult](#client4646loadmoreentriesresult) : <code>object</code>
        * [~eventHandler](#client4646eventhandler) : <code>function</code>

<a id="new95client95new"></a>

### new Client(socket)
Creates a Client instance.


| Param | Type | Description |
| --- | --- | --- |
| socket | <code>SocketIoConnection</code> | socket connection to client |

<a id="client43connecttimestamp"></a>

### client.connectTimestamp : <code>number</code>
Timestamp of connect-event.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43id"></a>

### client.id : <code>number</code>
Internal (process-unique) id for a client.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43ip"></a>

### client.ip : <code>string</code>
IP-Address of connected client.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43useragent"></a>

### client.userAgent : <code>string</code>
User-Agent of connected client.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client4395socket"></a>

### client.\_socket : <code>SocketIoConnection</code> ℗
Open socket connection to client.

**Kind**: instance property of [<code>Client</code>](#client)  
**Access**: private  
<a id="client43activeeventid"></a>

### client.activeEventId : <code>ObjectID</code> &#124; <code>null</code>
Id of active event.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43adminloggedin"></a>

### client.adminLoggedIn : <code>boolean</code>
Indicates if logged in as (super) admin.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43commentssubscribedforentryid"></a>

### client.commentsSubscribedForEntryId : <code>ObjectID</code> &#124; <code>null</code>
Id of entry client subscribed comments of.
Null indicates that no comments(-updates/-data) are subscribed.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43entriessubscription"></a>

### client.entriesSubscription
Infos about clients subscribed entries.

**Kind**: instance property of [<code>Client</code>](#client)  

* [.entriesSubscription](#client43entriessubscription)
    * [.listSubscription](#client43entriessubscription46listsubscription) : <code>EntryListSubscription</code> &#124; <code>null</code>
    * [.subscribedIds](#client43entriessubscription46subscribedids) : <code>[ &#x27;Array&#x27; ].&lt;ObjectID&gt;</code>

<a id="client43entriessubscription46listsubscription"></a>

#### entriesSubscription.listSubscription : <code>EntryListSubscription</code> &#124; <code>null</code>
List subscription instance.
Null indicates that no list subscription is active.

**Kind**: static property of [<code>entriesSubscription</code>](#client43entriessubscription)  
<a id="client43entriessubscription46subscribedids"></a>

#### entriesSubscription.subscribedIds : <code>[ &#x27;Array&#x27; ].&lt;ObjectID&gt;</code>
List of subscribed entryIds.

**Kind**: static property of [<code>entriesSubscription</code>](#client43entriessubscription)  
<a id="client43hasacceptedtos"></a>

### client.hasAcceptedTos : <code>boolean</code>
Indicates if auth-user has accepted the terms of service.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43logintimestamp"></a>

### client.loginTimestamp : <code>number</code> &#124; <code>null</code>
Timestamp of login / continue session.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43permissionlevel"></a>

### client.permissionLevel : <code>PermissionLevelEnum</code>
Permissionlevel of user for active event. 
Defaults to NOT_A_USER.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43sessiontoken"></a>

### client.sessionToken : <code>string</code> &#124; <code>null</code>
Currently used sessionToken (by authenticated user).

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43subscribedfulleventdict"></a>

### client.subscribedFullEventDict : <code>boolean</code>
Indicates if client subcribed to full EventDict.
Defaults to false.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client43userid"></a>

### client.userId : <code>string</code> &#124; <code>null</code>
Id of authenticated user.

**Kind**: instance property of [<code>Client</code>](#client)  
<a id="client4395init"></a>

### client.\_init() ℗
Initializes / resets client-state properties.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handledisconnect"></a>

### client.\_handleDisconnect() ℗
Eventhandler for socket disconnect event.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395setupafterauthentication"></a>

### client.\_setupAfterAuthentication(loginData) ⇒ <code>Promise</code> ℗
Initializes instance-state by users login-data.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| loginData | <code>UserController~LoginData</code> | loginData object |

<a id="client4395trackandsaveusersessioninfos"></a>

### client.\_trackAndSaveUserSessionInfos() ⇒ <code>Promise</code> ℗
Saves session-infos for user.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handleadminlogin"></a>

### client.\_handleAdminLogin(data) ⇒ <code>Promise</code> ℗
Eventhandler for admin login.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.password | <code>string</code> | password |

<a id="client4395handlecreatenewevent"></a>

### client.\_handleCreateNewEvent(data) ⇒ <code>Promise</code> ℗
Eventhandler for creating a new event.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.title | <code>string</code> | title |
| data.customId | <code>string</code> | custom id for new event |

<a id="client4395handlechangevoteforcomment"></a>

### client.\_handleChangeVoteForComment(data) ⇒ <code>Promise</code> ℗
Eventhandler for vote change on comment.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.commentId | <code>string</code> | commentId (as string) |
| data.entryId | <code>string</code> | entryId (as string) |
| data.vote | <code>number</code> | number representing vote (>0: upvote, 0: no vote, <0: downvote) |

<a id="client4395handledeletecomment"></a>

### client.\_handleDeleteComment(data) ⇒ <code>Promise</code> ℗
Eventhandler for comment deletion.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.commentId | <code>string</code> | commentId (as string) |
| data.entryId | <code>string</code> | entryId (as string) |

<a id="client4395handlepostcomment"></a>

### client.\_handlePostComment(data) ⇒ <code>Promise</code> ℗
Eventhandler for new comment posted.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.content | <code>string</code> | content of comment |
| data.entryId | <code>string</code> | entryId (as string) |
| data.imageDataArr | <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> | array of attached images (base64 encoded) |
| data.isAnonymous | <code>boolean</code> | true if posting is anonymous, otherwise false |
| data.parentId | <code>string</code> &#124; <code>null</code> | id of parent-comment (as string). null for toplevel |

<a id="client4395handlereadcomment"></a>

### client.\_handleReadComment(data) ⇒ <code>Promise</code> ℗
Eventhandler for comment was read by user.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.commentId | <code>string</code> | commentId (as string) |
| data.entryId | <code>string</code> | id of entry (as string) |
| data.isScrollOver | <code>boolean</code> | true if read-event was triggered while scrolling over comment, false otherwise (focus, click) |

<a id="client4395handlesubscribecommentsforentry"></a>

### client.\_handleSubscribeCommentsForEntry(data) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;CommentsController~CommentDict&gt;</code> ℗
Eventhandler for comment subscription request (for entry).

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;CommentsController~CommentDict&gt;</code> - returns dict of comments  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryId | <code>string</code> | entryId (as string) |

<a id="client4395handleunsubscribecommentsforentry"></a>

### client.\_handleUnsubscribeCommentsForEntry() ⇒ <code>Promise</code> ℗
Eventhandler for comment unsubscription request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handlebroadcastnewimage"></a>

### client.\_handleBroadcastNewImage(data) ⇒ <code>Promise</code> ℗
Eventhandler for image/screenshot broadcast.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.imageData | <code>string</code> | base64 image-data of full image |

<a id="client4395handlechangebookmark"></a>

### client.\_handleChangeBookmark(data) ⇒ <code>Promise</code> ℗
Eventhandler for bookmark changed (for entry).

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryId | <code>string</code> | id of entry (as string) |
| data.bookmark | <code>boolean</code> | true sets bookmark, false unsets |

<a id="client4395handlechangefollow"></a>

### client.\_handleChangeFollow(data) ⇒ <code>Promise</code> ℗
Eventhandler for follow-state changed (for entry).

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryId | <code>string</code> | id of entry (as string) |
| data.follow | <code>boolean</code> | true sets follow, false unsets |

<a id="client4395handlechangevote"></a>

### client.\_handleChangeVote(data) ⇒ <code>Promise</code> ℗
Eventhandler for vote change on entry.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryId | <code>string</code> | entryId (as string) |
| data.vote | <code>number</code> | number representing vote (>0: upvote, 0: no vote, <0: downvote) |

<a id="client4395handledeleteentry"></a>

### client.\_handleDeleteEntry(data) ⇒ <code>Promise</code> ℗
Eventhandler for entry deletion.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryId | <code>string</code> | entryId (as string) |

<a id="client4395handleloadmoreentries"></a>

### client.\_handleLoadMoreEntries() ⇒ [<code> &#x27;Promise&#x27; ].&lt;LoadMoreEntriesResult&gt;</code> ℗
Eventhandler for load more entries request (depends on active list subscription).

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: [<code>[ &#x27;Promise&#x27; ].&lt;LoadMoreEntriesResult&gt;</code>](#client4646loadmoreentriesresult) - returns more entries  
**Access**: private  
<a id="client4395handlepostentry"></a>

### client.\_handlePostEntry(data) ⇒ <code>Promise</code> ℗
Eventhandler for new entry posted.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.content | <code>string</code> | content of comment |
| data.imageDataArr | <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> | array of attached images (base64 encoded) |
| data.isAnonymous | <code>boolean</code> | true if posting is anonymous, otherwise false |

<a id="client4395handlereadentry"></a>

### client.\_handleReadEntry(data) ⇒ <code>Promise</code> ℗
Eventhandler for entry was read by user.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryId | <code>string</code> | id of entry (as string) |
| data.isScrollOver | <code>boolean</code> | true if read-event was triggered while scrolling over entry, false otherwise (focus, click) |

<a id="client4395handlesubscribeentries"></a>

### client.\_handleSubscribeEntries(data) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;EntriesController~EntryDict&gt;</code> ℗
Eventhandler for subscribe to entries request (by ids).

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;EntriesController~EntryDict&gt;</code> - resolves to dictionary of entries (that were subscribed)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryIds | <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> | array of entryIds (as strings) |

<a id="client4395handlesubscribeentrylist"></a>

### client.\_handleSubscribeEntryList(data) ℗
Eventhandler for subscribe to entry-list request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.listType | <code>EntryListTypeEnum</code> | list type |
| data.onlyBookmarked | <code>boolean</code> | indicates if only bookmarked entries should be included in subscription |

<a id="client4395handleunsubscribeentries"></a>

### client.\_handleUnsubscribeEntries(data) ℗
Eventhandler for unsubscribe from (previously subscribed) entries request (by ids).

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.entryIds | <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> | array of entryIds (as strings) |

<a id="client4395handleunsubscribeentrylist"></a>

### client.\_handleUnsubscribeEntryList() ℗
Eventhandler for unsubscribe from (previously subscribed) entry-list request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handlechangeeventname"></a>

### client.\_handleChangeEventName(data) ⇒ <code>Promise</code> ℗
Eventhandler for change event name/title request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.eventId | <code>string</code> | eventId (as string) |
| data.newName | <code>string</code> | new name of event |

<a id="client4395handlechangeeventrolelist"></a>

### client.\_handleChangeEventRoleList(data) ⇒ <code>Promise</code> ℗
Eventhandler for change event RoleList request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.eventId | <code>string</code> | eventId (as string) |
| data.roleList | <code>RoleList</code> | new role list |

<a id="client4395handlechangeuserpermissionlevelandrole"></a>

### client.\_handleChangeUserPermissionLevelAndRole(data) ⇒ <code>Promise</code> ℗
Eventhandler for change event RoleList request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.eventId | <code>string</code> | eventId (as string) |
| data.userId | <code>string</code> | id of user subject to change |
| data.permissionLevel | <code>PermissionLevelEnum</code> | new permissionLevel for user |
| data.roleId | <code>string</code> &#124; <code>null</code> | id of new role for user. null or '' will remove the current role |

<a id="client4395handlesubscribefulleventdict"></a>

### client.\_handleSubscribeFullEventDict() ⇒ <code>Promise</code> ℗
Eventhandler for subscribe to full EventDict request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handleunsubscribefulleventdict"></a>

### client.\_handleUnsubscribeFullEventDict() ℗
Eventhandler for unsubscribe from full EventDict request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handlejoinevent"></a>

### client.\_handleJoinEvent(data) ⇒ <code>Promise</code> ℗
Eventhandler for join-event request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.eventId | <code>string</code> | eventId (as string) |

<a id="client4395handleleaveevent"></a>

### client.\_handleLeaveEvent(data) ⇒ <code>Promise</code> ℗
Eventhandler for leave-event request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.eventId | <code>string</code> | eventId (as string) |

<a id="client4395handleswitchactiveevent"></a>

### client.\_handleSwitchActiveEvent(data) ⇒ <code>Promise</code> ℗
Eventhandler for switch-active-event request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.eventId | <code>string</code> | eventId (as string) |

<a id="client4395switchactiveevent"></a>

### client.\_switchActiveEvent(newEventId) ⇒ <code>Promise</code> ℗
Performs switch of active event. Initializes corresponding client context.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>Promise</code> - indicates success  
**Access**: private  
**Todo**

- [ ] reorganize position of this function


| Param | Type | Description |
| --- | --- | --- |
| newEventId | <code>ObjectID</code> &#124; <code>null</code> | id of event to switch to |

<a id="client4395handleloadimages"></a>

### client.\_handleLoadImages(data) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;ImagesController~GetImagesResult&gt;</code> ℗
Eventhandler for load images request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;ImagesController~GetImagesResult&gt;</code> - resolves to an object containing an imageDict and thumbnailDict property, if onlyThumbnails is set imageDict will be an empty object  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.imageIds | <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> | array of ids of images (as string) to retrieve |
| data.onlyThumbnails | <code>boolean</code> | indicates if only the thumbnails should be queried |

<a id="client4395handlemarkunreadnotifications"></a>

### client.\_handleMarkUnreadNotifications() ⇒ <code>Promise</code> ℗
Eventhandler for marking all unread notification as read by user.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handlereadnotification"></a>

### client.\_handleReadNotification(data) ⇒ <code>Promise</code> ℗
Eventhandler for notification was read by user.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.notificationId | <code>string</code> | id of notification (as string) |
| data.inAppClick | <code>boolean</code> | indicates if read was triggered by in-app click or indirect (e.g. mail-link) |

<a id="client4395handleaccepttos"></a>

### client.\_handleAcceptTos() ⇒ <code>Promise</code> ℗
Eventhandler for accept terms of service request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client4395handlechangeactivenotificationtypes"></a>

### client.\_handleChangeActiveNotificationTypes(data) ⇒ <code>Promise</code> ℗
Eventhandler for changing active notifications for user request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.emailNotifications | <code>[ &#x27;Array&#x27; ].&lt;NotificationTypesEnum&gt;</code> | array of activated email notification types |
| data.inAppNotifications | <code>[ &#x27;Array&#x27; ].&lt;NotificationTypesEnum&gt;</code> | array of activated in-app notification types |

<a id="client4395handlecontinuesession"></a>

### client.\_handleContinueSession(data) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;UserController~LoginData&gt;</code> ℗
Eventhandler for continue session request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;UserController~LoginData&gt;</code> - returns loginData  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.sessionToken | <code>string</code> | sessionToken |

<a id="client4395handlegetactivenotificationtypes"></a>

### client.\_handleGetActiveNotificationTypes() ⇒ <code>[ &#x27;Promise&#x27; ].&lt;object&gt;</code> ℗
Eventhandler for retrieving active notifications for user request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;object&gt;</code> - resolves to object containing emailNotifications and inAppNotifications  
**Access**: private  
<a id="client4395handlelogin"></a>

### client.\_handleLogin(data) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;UserController~LoginData&gt;</code> ℗
Eventhandler for login request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;UserController~LoginData&gt;</code> - returns loginData  
**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.email | <code>string</code> | email of user |
| data.password | <code>string</code> | password of user |

<a id="client4395handlelogout"></a>

### client.\_handleLogout() ℗
Eventhandler for logout request.

**Kind**: instance method of [<code>Client</code>](#client)  
**Access**: private  
<a id="client43on"></a>

### client.on(event, handler, [options])
Registers an event-handler. Calls event handler with current context (this).

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> |  | event-identifier |
| handler | [<code>eventHandler</code>](#client4646eventhandler) |  | event-handler |
| [options] | <code>object</code> |  | additional options |
| [options.requiresActiveEvent] | <code>boolean</code> | <code>false</code> | true if event-handler requires an event to be active |
| [options.requiresAuthentication] | <code>boolean</code> | <code>false</code> | true if event-handler requries authentication |
| [options.requiredPermissionLevel] | <code>PermissionLevelEnum</code> | <code>PermissionLevelEnum.NOT_A_USER</code> | required permission level |

<a id="client43emitupdatecommentdict"></a>

### client.emitUpdateCommentDict(commentDict)
Sends specified CommentDict to client.

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| commentDict | <code>CommentsController~CommentDict</code> | CommentDict to send |

<a id="client43updatecomment"></a>

### client.updateComment(entryId, commentId) ⇒ <code>Promise</code>
Sends a specified comment by its id to client.
Should get called when subscribed comment got updated.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>Promise</code> - indicates success  

| Param | Type | Description |
| --- | --- | --- |
| entryId | <code>ObjectID</code> | id of entry of updated comment |
| commentId | <code>ObjectID</code> | id of comment which has been updated |

<a id="client43emitupdateentries"></a>

### client.emitUpdateEntries(entryDict, [idList])
Sends specified EntryDict (and optional corresponding idList from list subscription) to client.

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| entryDict | <code>EntriesController~EntryDict</code> | EntryDict to send |
| [idList] | <code>[ &#x27;Array&#x27; ].&lt;ObjectID&gt;</code> | updated id list for list subscription (optional) |

<a id="client43updateentry"></a>

### client.updateEntry(entryInfo) ⇒ <code>Promise</code>
Checks if client subscribed to entry (specified by EntryInfo), 
updates list subscription and sends entry-update to client if neccessary.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>Promise</code> - indicates success  

| Param | Type | Description |
| --- | --- | --- |
| entryInfo | <code>EntriesController~EntryInfo</code> | EntryInfo of entry to update |

<a id="client43emitupdaterolelist"></a>

### client.emitUpdateRoleList(roleList)
Sends a specified RoleList to client.

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| roleList | <code>EventsController~RoleList</code> | role-list to send |

<a id="client43emitupdateuserdict"></a>

### client.emitUpdateUserDict(userDict)
Sends a specified UserDict to client.

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| userDict | <code>EventsController~UserDict</code> | UserDict to send |

<a id="client43updaterolelist"></a>

### client.updateRoleList(eventId) ⇒ <code>Promise</code>
Retrieves role list for given eventId and sends it to the client.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>Promise</code> - indicates success  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>ObjectID</code> | eventId for event which roles to update |

<a id="client43emitupdateeventdict"></a>

### client.emitUpdateEventDict(eventDict)
Sends a specified EventDict to client.

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| eventDict | <code>EventsController~EventDict</code> | EventDict to send |

<a id="client43updateeventdict"></a>

### client.updateEventDict(eventIds) ⇒ <code>Promise</code>
Retrieves event-data for specified eventIds 
and sends an EventDict-update to the client.

**Kind**: instance method of [<code>Client</code>](#client)  
**Returns**: <code>Promise</code> - indicates success  

| Param | Type | Description |
| --- | --- | --- |
| eventIds | <code>[ &#x27;Array&#x27; ].&lt;ObjectID&gt;</code> | array of eventIds that got updated  and need to be updated on the client |

<a id="client43emitupdateeventscreenshotids"></a>

### client.emitUpdateEventScreenshotIds(imageIds)
Sends specified imageIds (as available event-screenshots for the active event)
to the client.

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| imageIds | <code>[ &#x27;Array&#x27; ].&lt;ObjectID&gt;</code> | array of imageIds for screenshots of active event |

<a id="client43emitupdatenotificationdict"></a>

### client.emitUpdateNotificationDict(clientNotificationDict)
Sends (Client-)Notifications to client.

**Kind**: instance method of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| clientNotificationDict | <code>NotificationsController~ClientNotificationDict</code> | notification dict to send |

<a id="client4646loadmoreentriesresult"></a>

### Client~LoadMoreEntriesResult : <code>object</code>
Result of _handleLoadMoreEntries call.

**Kind**: inner typedef of [<code>Client</code>](#client)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entryDict | <code>EntriesController~EntryDict</code> | dict containing next entries |
| hasMoreEntriesToLoad | <code>boolean</code> | indicates if more entries can be loaded |
| idList | <code>[ &#x27;Array&#x27; ].&lt;ObjectID&gt;</code> | array of entry-ids (see EntryListSubscription.getIdList()) |

<a id="client4646eventhandler"></a>

### Client~eventHandler : <code>function</code>
Handler for client-event.
Can be async.
Response data must be returned.

**Kind**: inner typedef of [<code>Client</code>](#client)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | event-data |

