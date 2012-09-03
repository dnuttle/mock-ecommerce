(function(NUTHATCH){
		var component = {
		name:"http",
		version:"1.0"
	}
	
	/**
	 * Returns an array of values for a parameter name; empty array if no values found.
	 * This method is *not* chainable.
	 * @name: The name of the parameter to be sought.  Required.
	 * @url:  The URL to be searched.  Defaults to location.href.
	 */
	NUTHATCH.fn.getHttpParameterValues = function(name,url){
		if(!url)url=location.href;
		var patt = new RegExp("(?:&|\\?)" + name + "=(.*?)(?=$|&)","g");
		var ret = [];
		var r;
		while((r=patt.exec(url))!=null){
			ret.push(r[1]);
		}
		return ret;
	}
	NUTHATCH.fn.getHttpParameterValues.component = component;

	/**
	 * Returns the first value for a parameter, if found, otherwise returns undefined.
	 * @name: The name of the parameter to be sought.  Required.
	 * @url:  The URL to be searched.  Defaults to location.href.
	 */
	NUTHATCH.fn.getHttpParameterValue = function(name,url){
		var r = this.getHttpParameterValues(name,url);
		if(r && r.length) return r[0];
	}
	NUTHATCH.fn.getHttpParameterValue.component=component;

	/**
	 * Returns true if a given parameter name is found, whether value is present or not
	 */
	NUTHATCH.fn.isHttpParameterPresent = function(name,url){
		if(!url)url=location.href;
		var patt = new RegExp("(?:\\?|&)(" + name + ")(?:=|&|$)");
		var result = url.match(patt);
		if(result && result.length) return true;
		else return false;
	}
	NUTHATCH.fn.isHttpParameterPresent.component=component;

}(NUTHATCH));
