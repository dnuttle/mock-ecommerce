(function(NUTHATCH) {
	/**
	 * Cookie library provides for setting, reading and deleting cookies.
	 */
	 var component = {
		 name: "cookie",
		 version: "1.0"
	 }

	/**
	 * Set a cookie.  No provision for setting domain.
	 * The cookie value is URI encoded.
	 * If expire is null, a session cookie is created.
	 * If expire is a number, that is expire time in seconds (not ms).
	 * If expire is a string, a UTC date string is expected.
	 * @name: Cookie name.  Required.
	 * @value: Cookie value.  Required.
	 * @expire:  Expiration value in seconds (integer) or UTC string.  Optional.
	 * @path:  Cookie domain path.  Optional.
	 */
	NUTHATCH.fn.setCookie = function(name, value, expire, path) {
		if(!name || !value) throw "Cookie name or value  not specified";
		value = escape(value);
		var cpath = "path=/";
		if(typeof path === "string" && path.length>0) cpath = "path=" + path;
		if(expire===null) expire = "";
		if(typeof expire === 'number') {
			expire = new Date(new Date().getTime() + (expire * 1000)).toUTCString();
		}
		var cookie = name + "=" + value + "; " +
			cpath + "; " +
			"expires=" + expire + "; ";
		document.cookie = cookie;
		return this;
	}
	NUTHATCH.fn.setCookie.component = component;

	/**
	 * Delete a cookie, if present.
	 * @name: Cookie name.  Required.
	 * @path: Cookie domain path.  Optional, defaults to "/".
	 */
	NUTHATCH.fn.deleteCookie = function(name, path)
	{
		if(!name) throw "Cookie name not specified";
		var d = new Date();
		var cpath = "path=/;";
		if(typeof path === "string" && path.length>0) cpath = "path=" + path + ";";
		var cookie = name + "=;expires=" + setExpiration(0) + ";" + cpath;
		document.cookie = cookie;
		return this;
	}
	var setExpiration = function(cookieLife){
		var today = new Date();
		var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000);
		return  expr.toGMTString();
	}
	NUTHATCH.fn.deleteCookie.component = component;
	
	/**
	 * Get a cookie's value.
	 * This method is *not* chainable.
	 * @name:  Cookie name.  Required.
	 */
	NUTHATCH.fn.getCookieValue = function(name) {
		if(!name) throw "Cookie name not specified";
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) {
				return decodeURIComponent(c.substr(nameEQ.length));
			}
		}
	}
	NUTHATCH.fn.getCookieValue.component = component;

}(NUTHATCH));
