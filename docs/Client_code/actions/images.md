<a id="addlocalimage"></a>

## addLocalImage() ⇒ <code>object</code>
Creates action for adding a local image to images managed in redux-store.

**Kind**: global function  
**Returns**: <code>object</code> - action  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id of image (typically starts with "local-" and is generated by generateLocalImageId() helper func) |
| imageData | <code>string</code> | full res image-data (as base64) |
| thumbnailData | <code>string</code> | low res image-data used as thumbnail (as base64) |

<a id="loadimages"></a>

## loadImages(imageIds, onlyThumbnails) ⇒ <code>object</code>
Creates action for loading a remote images.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| imageIds | <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> | array of imageIds to load |
| onlyThumbnails | <code>boolean</code> | indicates if only the thumbnails should be queried |

<a id="removeimages"></a>

## removeImages(imageIds) ⇒ <code>object</code>
Creates action for removing images from local store.

**Kind**: global function  
**Returns**: <code>object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| imageIds | <code>[ &#x27;Array&#x27; ].&lt;string&gt;</code> | array of imageIds to remove |

