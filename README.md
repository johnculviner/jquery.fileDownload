# 2019 modern browsers update

This is the approach I'd now recommend with a few caveats:
- A relatively modern browser is required
- If the file is expected to be very large you should likely do something similar to the original approach (iframe and cookie) because some of the below operations could likely consume system memory at least as large as the file being downloaded and/or other interesting CPU side effects.

```
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(resp => resp.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = 'todo-1.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    alert('your file has downloaded!'); // or you know, something with better UX...
  })
  .catch(() => alert('oh no!'));
```

Example of the above code in action: https://codesandbox.io/s/fetch-based-file-download-0kxod

# Original approach
jQuery File Download is a cross server platform compatible jQuery plugin that allows for an Ajax-like file download experience that isn't normally possible using the web.

### Source here:
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Scripts/jquery.fileDownload.js

### Targeting pretty modern browser(s)?
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


# Note - You must also write a cookie in conjunction with using this plugin in the server's response headers
```
Set-Cookie: fileDownload=true; path=/"
```
More details here:
https://johnculviner.com/jquery-file-download-plugin-for-ajax-like-feature-rich-file-downloads/

# Install
```
bower install jquery-file-download -S
```

#### Example of writing cookie (MVC):
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Common/FileDownloadAttribute.cs<br/>
The above attribute can be used on any controller action that may return a file download that you would like to use jquery.fileDownload.js with

### For more information and documentation please visit:
https://johnculviner.com/tag/jquery-filedownload-js/

### Or look at the well documented JavaScript source:
https://github.com/johnculviner/jquery.fileDownload/blob/master/src/Scripts/jquery.fileDownload.js

### Ruby on Rails integration

The [`jquery_file_download-rails`](https://github.com/rcook/jquery_file_download-rails)
gem integrates `jquery.fileDownload.js` into the Rails 3.1+ asset pipeline.

### PHP integration
https://github.com/seiko777/PHP-jquery-downloader

