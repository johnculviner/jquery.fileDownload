jQuery File Download is a cross server platform compatible jQuery plugin that allows for an Ajax-like file download experience that isn't normally possible using the web.

Source here:
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Scripts/jquery.fileDownload.js

### Requirements
* jQuery 1.6+

### Supported and tested browsers
* Internet Explorer 6+ - Works fine for standard use cases except in < IE9 JavaScript access to the *failed* response HTML doesn't (and can't) work reliably due to browser iframe constraints.
* Firefox 11+ - reasonably sure it will work on earlier versions
* Chrome 17+ - reasonably sure it will work on earlier versions
* iOS 5.0+ - reasonably sure it will work on earlier versions 
* Android 4.0+ - non-GET requests do not work due to a long-standing [bug](http://code.google.com/p/android/issues/detail?id=1780) in the Android browser. This is handled 'gracefully' with a message to the user.

###Demo (of this exact source):
http://jqueryfiledownload.apphb.com/

#Note - You must also write a cookie in conjunction with using this plugin as mentioned in the orignal post:
http://johnculviner.com/post/2012/03/22/Ajax-like-feature-rich-file-downloads-with-jQuery-File-Download.aspx

####Example of writing cookie (MVC):
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Common/FileDownloadAttribute.cs<br/>
The above attribute can be used on any controller action that may return a file download that you would like to use jquery.fileDownload.js with

###For more information and documentation please visit:
http://johnculviner.com/category/jQuery-File-Download.aspx

###Or look at the well documented JavaScript source:
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Scripts/jquery.fileDownload.js

