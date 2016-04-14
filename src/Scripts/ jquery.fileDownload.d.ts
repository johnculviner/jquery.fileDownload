/**
 * Interface for the JQuery.fileDownload object
 */
interface JQueryStatic
{
    /**
        * Forces download resource
    */
    fileDownload(fileUrl: string,options: FileDownloadOptions): JQueryDeferred<any>;
}

interface FileDownloadOptions
{
    /**
    *Requires jQuery UI: provide a message to display to the user when the file download is being prepared before the browser's dialog appears
    */
    preparingMessageHtml?: string;

    /**
    *Requires jQuery UI: provide a message to display to the user when a file download fails
    */
    failMessageHtml?: string;

    /**
    *The stock android browser straight up doesn't support file downloads initiated by a non GET: http://code.google.com/p/android/issues/detail?id=1780
    *specify a message here to display if a user tries with an android browser
    *if jQuery UI is installed this will be a dialog, otherwise it will be an alert
    *Set to null to disable the message and attempt to download anyway
    */
    androidPostUnsupportedMessageHtml?: string;

    /**
    *Requires jQuery UI: options to pass into jQuery UI Dialog
    */
    dialogOptions?: { modal: boolean };

    /**
    *The HTTP method to use. Defaults to "GET".
    */
    httpMethod?: string;

    /**
    *If specified will perform a "httpMethod" request to the specified 'fileUrl' using the specified data.
    *Data must be an object (which will be $.param serialized) or already a key=value param string
    */
    data?: any;

    /**
    *The period in milliseconds to poll to determine if a successful file download has occured or not
    */
    checkInterval?: number;

    /**
    *The cookie name to indicate if a file download has occured
    */
    cookieName?: string;

    /**
    *The cookie value for the above name to indicate that a file download has occured
    */
    cookieValue?: string;

    /**
    *The cookie path for above name value pair
    */
    cookiePath?: string;

    /**
    *If specified it will be used when attempting to clear the above name value pair
    *useful for when downloads are being served on a subdomain (e.g. downloads.example.com)
    */
    cookieDomain?: string;

    /**
    *The title for the popup second window as a download is processing in the case of a mobile browser
    */
    popupWindowTitle?: string;

    /**
    *Functionality to encode HTML entities for a POST, need this if data is an object with properties whose values contains strings with quotation marks.
    *HTML entity encoding is done by replacing all &,<,>,',",\r,\n characters.
    *Note that some browsers will POST the string htmlentity-encoded whilst others will decode it before POSTing.
    *It is recommended that on the server, htmlentity decoding is done irrespective.
    */
    encodeHTMLEntities?: boolean;
}
