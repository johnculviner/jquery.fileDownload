/*
* jQuery File Download Plugin v1.2.0
*
* http://www.johnculviner.com
*
* Copyright (c) 2012 - John Culviner
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*/


$.extend({
    //
    //$.fileDownload('/path/to/url/', options)
    //  see directly below for possible 'options'
    fileDownload: function (fileUrl, options) {

        var defaultFailCallback = function (responseHtml, url) {
            alert("A file download error has occurred, please try again.");
        };

        //provide some reasonable defaults to any unspecified options below
        var settings = $.extend({

            //
            //Requires jQuery UI: provide a message to display to the user when the file download is being prepared before the browser's dialog appears
            //
            preparingMessageHtml: null,

            //
            //Requires jQuery UI: provide a message to display to the user when a file download fails
            //
            failMessageHtml: null,

            //
            //Requires jQuery UI: options to pass into jQuery UI Dialog
            //
            dialogOptions: { modal: true },

            //
            //a function to call after a file download dialog/ribbon has appeared
            //Args:
            //  url - the original url attempted
            //
            successCallback: function (url) { },

            //
            //a function to call after a file download dialog/ribbon has appeared
            //Args:
            //  responseHtml    - the html that came back in response to the file download. this won't necessarily come back depending on the browser.
            //                      in less than IE9 a cross domain error occurs because 500+ errors cause a cross domain issue due to IE subbing out the
            //                      server's error message with a "helpful" IE built in message
            //  url             - the original url attempted
            //
            failCallback: defaultFailCallback,

            //
            // the HTTP method to use. Defaults to "GET".
            //
            httpMethod: "GET",

            //
            // if specified will perform a "httpMethod" request to the specified 'fileUrl' using the specified data.
            // data must be an object (which will be $.param serialized) or already a key=value param string
            //
            data: null,

            //
            //a period in milliseconds to poll to determine if a successful file download has occured or not
            //
            checkInterval: 100,

            //
            //the cookie name to indicate if a file download has occured
            //
            cookieName: "fileDownload",

            //
            //the cookie value for the above name to indicate that a file download has occured
            //
            cookieValue: "true",

            //
            //the cookie path for above name value pair
            //
            cookiePath: "/"
        }, options);


        //wire up a jquery dialog to display the preparing message if specified
        var $preparingDialog = null;
        if (settings.preparingMessageHtml) {

            $preparingDialog = $("<div>" + settings.preparingMessageHtml + "</div>").dialog(settings.dialogOptions);

        }

        var internalCallbacks = {

            onSuccess: function (url) {

                //remove the perparing message if it was specified
                if ($preparingDialog) {
                    $preparingDialog.dialog('close');
                };

                settings.successCallback(url);

            },

            onFail: function (responseHtml, url) {

                //remove the perparing message if it was specified
                if ($preparingDialog) {
                    $preparingDialog.dialog('close');
                };

                //wire up a jquery dialog to display the fail message if specified
                if (settings.failMessageHtml) {

                    $("<div>" + settings.failMessageHtml + "</div>").dialog(settings.dialogOptions);

                    //only run the fallcallback if the developer specified something different than default
                    //otherwise we would see two messages about how the file download failed
                    if (settings.failCallback != defaultFailCallback) {
                        settings.failCallback(responseHtml, url);
                    }

                } else {

                    settings.failCallback(responseHtml, url);
                }
            }
        };


        //make settings.data a param string if it exists and isn't already
        if (settings.data !== null && typeof settings.data !== "string") {
            settings.data = $.param(settings.data);
        }


        var $iframe, $iframeForm;

        if (settings.httpMethod.toUpperCase() === "GET") {

            if (settings.data !== null) {
                //need to merge any fileUrl params with the data object

                var qsStart = fileUrl.indexOf('?');

                if (qsStart != -1) {
                    //we have a querystring in the url

                    if (fileUrl.substring(fileUrl.length - 1) !== "&") {
                        fileUrl = fileUrl + "&";
                    }
                } else {

                    fileUrl = fileUrl + "?";
                }

                fileUrl = fileUrl + settings.data;
            }

            //create a temporary iframe that is used to request the fileUrl as a GET request
            $iframe = $("<iframe style='display: none' src='" + fileUrl + "'></iframe>").appendTo("body");

        } else {

            var formInputs = "";
            if (settings.data !== null) {

                $.each(settings.data.split("&"), function () {

                    var kvp = this.split("=");
                    formInputs += "<input type='text' name='" + kvp[0] + "' value='" + kvp[1] + "'/>";
                });
            }

            $iframe = $("<iframe id='jQueryFileDownload' src='about:blank'></iframe>").appendTo("body");

            var iframeDoc = getiframeDocument($iframe);

            iframeDoc.write("<html><head></head><body><form method='" + settings.httpMethod + "' action='" + fileUrl + "'>" + formInputs + "</form></body></html>");

            $iframeForm = $(iframeDoc).find('form');
            $iframeForm.submit();
        }


        //check if the file download has completed every checkInterval ms
        setTimeout(checkFileDownloadComplete, settings.checkInterval);


        function checkFileDownloadComplete() {

            //has the cookie been written due to a file download occuring?
            if (document.cookie.indexOf(settings.cookieName + "=" + settings.cookieValue) != -1) {

                //execute specified callback
                internalCallbacks.onSuccess(fileUrl);

                //remove the cookie and iframe
                var date = new Date(1000);
                document.cookie = settings.cookieName + "=; expires=" + date.toUTCString() + "; path=" + settings.cookiePath;

                $iframe.remove();

                return;
            }

            try {

                var iframeDoc = getiframeDocument($iframe);
                if (iframeDoc && iframeDoc.body != null && iframeDoc.body.innerHTML.length > 0) {

                    var isFailure = true;

                    if ($iframeForm && $iframeForm.length > 0) {
                        var $contents = $(iframeDoc.body).contents().first();

                        if ($contents.length > 0 && $contents[0] === $iframeForm[0]) {
                            isFailure = false;
                        }
                    }

                    if (isFailure) {
                            internalCallbacks.onFail(iframeDoc.body.innerHTML, fileUrl);
                            $iframe.remove();
                            return;
                    }
                }
            }
            catch (err) {

                //500 error less than IE9
                internalCallbacks.onFail('', fileUrl);
                $iframe.remove();

                return;
            }


            //keep checking...
            setTimeout(checkFileDownloadComplete, settings.checkInterval);
        }

        //gets an iframes document in a cross browser compatible manner
        function getiframeDocument($iframe) {
            var iframeDoc = $iframe[0].contentWindow || $iframe[0].contentDocument;
            if (iframeDoc.document) {
                iframeDoc = iframeDoc.document;
            }
            return iframeDoc;
        }
    }
});

