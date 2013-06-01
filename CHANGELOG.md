<h2>jQuery File Download Changelog</h2>

<h4>6/01/2013 - 1.4.1</h4>
<ul>
	<li>Merged pull fixing constant location. Thanks Djemo!</li>
	<li>Added iframe removal after success/failure of download. Thanks for the idea joshua5822!</li>
</ul>

<h4>5/05/2013 - 1.4.0</h4>
<ul>
	<li>Added deferred support since promises are very useful and becoming ubiquitous</li>
	<li>Removed default error message alert() as it conflicted with promise support which is more useful</li>
	<li>Updated attr use to prop</li>
	<li>Due to above points jQuery 1.6+ is now required</li>
	<li>Merged in 'prepareCallback' - thanks loraderon</li>
	<li>Merged in some changes for more concise and compressable JS - thanks LeoDutra</li>
</ul>

<h4>11/08/2012</h4>
<ul>
	<li>Replaced base controller in demo with FileDownloadAttribute that allows setting cookie name and path on a per action basis.
	- contributed by https://github.com/rdefreitas</li>
</ul>

<h4>09/18/2012 - 1.3.3</h4>
<ul>
    <li>Removed iframe removal after file download all-together. This caused issues for Firefox under certain conditions and certainly isn't necessary. (Just keeps the DOM clean..)</li>
</ul>

<h4>09/06/2012 - 1.3.2</h4>
<ul>
    <li>Fixed a bug that intermittently occured in Firefox where a file download would complete but the built in browser save dialog would not appear</li>
	<li>Merged in a pull from doronhorwitz surrounding special character encoding. Thanks doronhorwitz!</li>
	<li>Added jQuery.noConflict() to avoid $ conflicts that were occuring for some users</li>
</ul>

<h4>06/26/2012 - 1.3.1</h4>
<ul>
    <li>Fixed a regression bug where POST file downloads weren't working properly in IE 6 or IE 7</li>
</ul>

<h4>06/13/2012 - 1.3.0</h4>
<ul>
    <li>Added mobile browser support. The Android browser is <a href="http://code.google.com/p/android/issues/detail?id=1780">unable</a> to support file downloads initiated by a non-GET requests</li>
	<li>Thanks to <a href="https://github.com/itsadok">itsadok</a> for fixing a bug dealing with character encoding and escaping with non-GET requests</li>
</ul>

<h4>04/10/2012 - 1.2.1</h4>
<ul>
    <li>The iframe used in the POST was accidentally visible, this has been fixed</li>
</ul>

<h4>04/09/2012 - 1.2.0</h4>
<ul>
    <li>Added ability to specify an <i>httpMethod</i> to perform the file download using. Useful for doing FORM submits that result in a file download</li>
    <li>Added <i>data</i> object which can be used with any <i>httpMethod</i> request to set parameters. This can be a key=value string or an object</li>
</ul>
<h4>04/09/2012 - 1.1.0</h4>
<ul>
    <li>Added new options arguments to make it very easy to pop up a jQuery Dialog, you just provide a "preparingMessageHtml" and/or "failMessageHtml"</li>
</ul>
<h4>03/22/2012 - 1.0.1</h4>
<ul>
    <li>Added more robust handling of certain kinds of file download errors in &lt; IE9. These versions of IE can disallow access to an iframe after an error has occured because the browser will display it's built in error page
        which exists in 'another domain' blocking JavaScript access to the iframe</li>
    <li>Switched iframe creation over to appendTo rather than append</li>
</ul>

<h4>03/21/2012 - 1.0.0</h4>
<ul>
    <li>Initial release</li>
</ul>