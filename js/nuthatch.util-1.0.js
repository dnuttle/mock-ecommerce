(function(NUTHATCH) {
	var component = {
		name:"util",
		version:"1.0"
	}
	/**
	 * Simple implementation of each, will execute fn for each item in coll, with that item as the context
	 * Returns an array containing all items when the function returned true.
	 * This method is *not* chainable.
	 * @coll: An array.  Required.
	 * @fn: A function to be executed for each item in the array.  Requred.  It should accept two parameters, the first is a numeric index
	 * and the second is the item being passed to it.  It should return true or false; true means that the each method should include the item
	 * in the array returned.
	 */
	NUTHATCH.fn.each = function(coll, fn) {
		var ret = [];
		if(!coll || !fn || !fn.call) throw "Collection or function not specified";
		for(i in coll) {
			var result = fn.call(coll[i], i, coll[i], arguments);
			if(result===true)ret.push(coll[i]);
		}
		return ret;
	}
	NUTHATCH.fn.each.component = component;

	/**
	 * Trims any opening and closing whitespace from a string.
	 * This method is not chainable.
	 * @val: The value to be trimmed.  If it is not present or null, undefined is returned.
	 */
	NUTHATCH.fn.trim = function(val) {
		if(typeof val === "undefined" || val === null) return;
		return val.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	NUTHATCH.fn.trim.component = component;

}(NUTHATCH));
