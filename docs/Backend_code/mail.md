<a id="module95mail"></a>

## mail
Mail transport.


* [mail](#module95mail)
    * _static_
        * [.sendMail(to, subject, html)](#module95mail46sendmail) ⇒ <code>Promise</code>
        * [.testConnection()](#module95mail46testconnection) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;boolean&gt;</code>
    * _inner_
        * [~transporter](#module95mail4646transporter) : <code>MailTransport</code>

<a id="module95mail46sendmail"></a>

### mail.sendMail(to, subject, html) ⇒ <code>Promise</code>
Send mail.

**Kind**: static method of [<code>mail</code>](#module95mail)  
**Returns**: <code>Promise</code> - never rejects, errors will be catched and printed  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | e-mail address to send to |
| subject | <code>string</code> | subject of mail |
| html | <code>string</code> | html-body of mail |

<a id="module95mail46testconnection"></a>

### mail.testConnection() ⇒ <code>[ &#x27;Promise&#x27; ].&lt;boolean&gt;</code>
Tests connection to mailserver.

**Kind**: static method of [<code>mail</code>](#module95mail)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;boolean&gt;</code> - resolves to true if successful, false otherwise  
<a id="module95mail4646transporter"></a>

### mail~transporter : <code>MailTransport</code>
Nodemailer-transport instance.

**Kind**: inner constant of [<code>mail</code>](#module95mail)  
