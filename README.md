jQuery File Download is a cross server platform compatible jQuery plugin that allows for an Ajax-like file download experience that isn't normally possible using the web.

###Demo (of this exact source):
http://jqueryfiledownload.apphb.com/

###Source here:
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Scripts/jquery.fileDownload.js

###Targeting pretty modern browser(s)?
This might be a better solution to your problem https://github.com/eligrey/FileSaver.js/

### Requirements
* jQuery 1.6+
 
### Common questions and answers
* Q: I need to send in custom headers. How do I do that?
  *  Unfortunately since this plugin uses an iframe and not AJAX you cannot send in custom headers. If you really need to do this and are willing to accept a more narrow range of browser support this might be a better solution to your problem https://github.com/eligrey/FileSaver.js/
* Q: It doesn't work!?
  * Try out the demo and make sure you are doing exactly what it is doing: http://jqueryfiledownload.apphb.com/ If the demo doesn't work in your browser you have defintely found a bug and us know!
  * Due to iframe security restrictions you must serve up the file from the same domain you see in the address bar

### Supported and tested browsers
* Internet Explorer 6+ - Works fine for standard use cases except in < IE9 JavaScript access to the *failed* response HTML doesn't (and can't) work reliably due to browser iframe constraints.
* Firefox 11+ - reasonably sure it will work on earlier versions
* Chrome 17+ - reasonably sure it will work on earlier versions
* iOS 5.0+ - reasonably sure it will work on earlier versions
* Android 4.0+ - non-GET requests do not work due to a long-standing [bug](http://code.google.com/p/android/issues/detail?id=1780) in the Android browser. This is handled 'gracefully' with a message to the user.


#Note - You must also write a cookie in conjunction with using this plugin as mentioned in the orignal post:
http://johnculviner.com/post/2012/03/22/Ajax-like-feature-rich-file-downloads-with-jQuery-File-Download.aspx

#Install
```
bower install jquery-file-download -S
```

####Example of writing cookie (MVC):
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Common/FileDownloadAttribute.cs<br/>
The above attribute can be used on any controller action that may return a file download that you would like to use jquery.fileDownload.js with

###For more information and documentation please visit:
http://johnculviner.com/category/jQuery-File-Download.aspx

###Or look at the well documented JavaScript source:
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Scripts/jquery.fileDownload.js

### Ruby on Rails integration

The [`jquery_file_download-rails`](https://github.com/rcook/jquery_file_download-rails)
gem integrates `jquery.fileDownload.js` into the Rails 3.1+ asset pipeline.

