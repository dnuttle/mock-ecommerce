(function(NUTHATCH) {
	var component = {
		name:"script",
		version:"1.0"
	}
	/**
	 * This will add a script tag to head.  The window must be finished loading before this method is called.
	 * @src: A string containing the URL of the script file.  Required.
	 * @typ: The value for the script tag's type attribute.  Optional, defaults to "text/javascript", specify null to suppress attribute.
	 */
	NUTHATCH.fn.addScriptToHead = function(src, typ) {
		if(!src) throw "No source URL specified";
		if(typeof typ==="undefined") typ="text/javascript";
		var fileref = document.createElement('script');
		if(typ)fileref.setAttribute('type', typ);
		fileref.setAttribute('src', src);
		document.getElementsByTagName('head')[0].appendChild(fileref);
		return this;
	}
	NUTHATCH.fn.addScriptToHead.component = component;

}(NUTHATCH));
