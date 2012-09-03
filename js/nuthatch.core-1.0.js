(function() {
	var _NUTHATCH = window.NUTHATCH;
	var NUTHATCH = window.NUTHATCH = function(elems){
		var instance = this;
		var s = "";
		for(var x in this){
			s += this[x];
		}
		if(!(instance instanceof NUTHATCH))instance = new NUTHATCH();
		instance._NUTHATCH = _NUTHATCH;
		instance.fn=instance.prototype;
		instance.elements=[];
		if(elems)instance.elements=instance._getContext(elems);
		instance.e=instance.elements;
		return instance;
	};
	NUTHATCH.prototype = NUTHATCH.fn = {
		elements: [],
		init: function(elems) {
			if(elems && elems.length){
				this.elements = this._dedupe(this.makeArray(elems));
			}else if(elems && typeof elems.length == "undefined"){
				this.elements.push(elems);
				this.elements = this._dedupe(this.elements);
			}
			return this;
		},
		noConflict : function() {
			var ret = window.NUTHATCH;
			window.NUTHATCH = this._NUTHATCH;
			return ret;
		},
		/**
		 * Makes a true array of an array, or array-like collection, or single element.
		 * Only true arrays or array-like collection of HTML elements, or single HTML elements, should be passed into this function.
		 * It is possible to submit non-HTML elements, but if a single item is passed that has a length property, and the intent is to
		 * make an array containing that single item, the result will instead be an array containing the items enumerated by its length property.
		 * I discovered this when a form element proved to have a length property, and so this function was originally returning the form elements
		 * of the form!  This bug has since been fixed, but still exists for other array-like , non-Element objects.
		 */
		makeArray: function(elems) {
			var arr = [];
			/*
			 * Check for single element must come before check for length property, because length does not guarantee it's an array.
			 * For example, a form element has a length property (enumerating form elements).
			 * This does still leave open possibility of a bug in that a single item that does have a length property, but does not
			 * have a ndoeType property, might be passed in and mistaken for an array.  But that is faulty usage, only HTML elements
			 * or arrays of them should be passed here.
			 */
			if(elems && elems.nodeType){ //Single element
				arr.push(elems);
			}
			if(elems && elems.length){ //Array
				for(var i = 0; i<elems.length; i++){
					arr.push(elems[i]);
				}
			}else if(typeof elems!="undefined" && elems != null && typeof elems.length == "undefined") //Something else
			{
				arr.push(elems);
			}
			return arr;
		},
		//internal use only
		addElements: function(elems){
			if(elems && elems.length >1){
				this.elements = this._dedupe(this.elements.concat(elems));
			}else if(elems && typeof elems.length=="undefined"){
				this.elements.push(elems);
			}
		},
		//Internal use only
		_dedupe: function(elems){
			var ret=[];
			for(var i=0;i<elems.length;i++){
				if(!this._contains(ret,elems[i])){
					ret.push(elems[i]);
				}
			}
			return ret;
		},
		//internal use only
		_contains: function(elems,elem){
			var i=elems.length;
			while(i--){
				if(elems[i]===elem){return true;break;}
			}
			return false;
		},
		isElement: function(o){
			return (o && o.nodeType && o.nodeType === 1);
		},
		isNode: function(o){
			return (o && o.nodeType);
		},
		//Internal use only!
		_chained: false
	};


}());
(function(NUTHATCH){
	var component = {
		name: "core",
		version: "1.0"
	}
	//internal use only, must only be called by a chaining NUTHATCH method
	//and then only when getting or filtering the elements of a parent NUTHATCH object
	//This means methods in the selector component only!
	NUTHATCH.fn._initNew = function(elems){
		var n = new NUTHATCH();
		n.init(elems);
		n.e = n.elements; //alias for brevity
		n._chained = true;
		return n;
	}
	//Internal use only
	/**
	 * Returns a context.  elems can be a NUTHATCH object, an array, or a single item
	 * If this is a chained call, then return the current instance, and ignore the context argument.
	 * If context arg is NUTHATCH, then return is that object's elements
	 * If array-like, return is elements in a true array
	 * If not array-like, return is the item as single element in an array
	 * In any case, however, anything that does not have a nodeType is thrown out.
	 * If no elems is specified, and this is not a chained call, and defaultToDocument is true,
	 * then an array containing document is returned.
	 * The idea here is that, on the initial selector call, the document is the context if none is specified, and on
	 * any subsequent chained call, any context specified is ignored.  Otherwise, use the context passed into the selector function.
	 */
	NUTHATCH.fn._getContext = function(context,defaultToDocument){
		var ret=[];
		var tmp;
		if(this._chained) return this.e;
		if(context instanceof NUTHATCH) tmp=context.e;
		else if(context && context.length) tmp=this.makeArray(context);
		else if(context)tmp=[context];
		else tmp=this.e;
		for(var i=0;i<tmp.length;i++)
		{
			if(tmp[i] && tmp[i].nodeType)ret.push(tmp[i]);
		}
		if(typeof context=="undefined" && !this._chained && defaultToDocument) {ret.push(document)};
		return ret;
	}
	for(var e in NUTHATCH.fn){
		e = NUTHATCH.fn[e];
		if(typeof e == "function"){
			e.component = component;
		}
	}
}(NUTHATCH));
