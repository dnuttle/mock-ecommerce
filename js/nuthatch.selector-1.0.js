(function(NUTHATCH) {
	
	var component = {
		name:"selector",
		version:"1.0",
		dependencies:["core"]
	}
	/**
	 * Returns the element with a given ID.
	 */
	NUTHATCH.fn.$ = function(id) {
		if(!id) throw "Must provide ID";
		var ret = this.makeArray(document.getElementById(id));
		return this._initNew(ret);
	}
	NUTHATCH.fn.$.component = component;

	/**
	 * Shorthand method for calling the methods in this component.
	 * The first argument should be one of the following string values:
	 * class: 	calls getElementsByClassName
	 * tag: 	calls getElementsByTagName
	 * attr:	calls getElementsByAttribute
	 * attrVal:	calls getElementsByAttributeValue
	 * prev:	calls getPreviousSibling
	 * next:	calls getNextSibling
	 * nthc:	calls getNthChild
	 * nthe:	calls getNthElement
	 * par:		calls getParent
	 * child:	calls getChildren
	 */
	NUTHATCH.fn.get = function(selector)
	{
		var args = this.makeArray(arguments);
		var filter=false;
		args.shift();
		selector=selector.toLowerCase();
		if(args[0]===":FILTER:")
		{
			args.shift();
			filter=true;
		}
		if(filter)
		{
			if(selector=="class") return this.febcn.apply(this,args);
			if(selector=="tag") return this.febtn.apply(this,args);
			if(selector=="attr") return this.feba.apply(this,args);
			if(selector=="attrval") return this.febav.apply(this,args);
			throw "Unrecognized selector in filter function (" + selector + ")";
		}
		else
		{
			//getElementsByClassName
			if(selector=="class") return this.gebcn.apply(this, args);
			//getElementsByTagName
			if(selector=="tag") return this.gebtn.apply(this, args);
			//getElementsByAttribute
			if(selector=="attr") return this.geba.apply(this, args);
			//getElementsByAttributeValue
			if(selector=="attrval") return this.gebav.apply(this, args);
			//getPreviousSibling
			if(selector=="prev") return this.gps.apply(this, args);
			//getNextSibling
			if(selector=="next") return this.gns.apply(this,args);
			//getNthChild
			if(selector=="nth-c") return this.gnc.apply(this, args);
			//getNthElement
			if(selector=="nth-e") return this.gne.apply(this, args);
			//getParent
			if(selector=="parent") return this.gp.apply(this, args);
			//getChildren
			if(selector=="children") return this.gc.apply(this, args);
			throw "Unrecognized selector in get function (" + selector + ")";
		}
	}
	NUTHATCH.fn.get.component=component;
	
	NUTHATCH.fn.filter = function(selector)
	{
		var args = this.makeArray(arguments);
		args.shift();
		args.unshift(":FILTER:");
		args.unshift(selector);
		return this.get.apply(this, args);
	}

	/**
	 * getElementsByTagName
	 * Returns all elements with a given tag name.
	 */
	
	NUTHATCH.fn.gebtn = function(tag, context){
		if(!tag) throw "No tag name specified";
		var ret = [];
		context = this._getContext(context,true);
		for(var i=0;i<context.length;i++){
			if(context[i].getElementsByTagName){
				var children = context[i].getElementsByTagName(tag);
				ret = ret.concat(this.makeArray(children));
			}
		}
		return this._initNew(ret);
	}
	NUTHATCH.fn.gebtn.component = component;
	NUTHATCH.fn.getElementsByTagName = NUTHATCH.fn.gebtn;

	/**
	 * filterElementsByTagName
	 * Returns all elements in a collection that have a given tag name
	 * If elems is not provided then the current collection is used
	 */
	NUTHATCH.fn.febtn = function(tag, elems){
		if(!tag)throw "Tag name not specified";
		var ret = [], e=this._getContext(elems,true);
		if(tag && e.length>0)
		{
			tag = tag.toUpperCase();
			for(var i=0;i<e.length;i++){
				if(tag==="*" || e[i].tagName === tag){
					ret.push(e[i]);
				}
			}
		}
		return this._initNew(ret);
	}
	NUTHATCH.fn.febtn.component = component;
	NUTHATCH.fn.filterElementsByTagName = NUTHATCH.fn.febtn;


	/**
	 * getElementsByAttributeValue
	 * Returns all elements (filterd by tag name) that have a specified attribute with a 
	 * specified value
	 */
	NUTHATCH.fn.gebav = function(attr, val, tag, parent)
	{
		if(!attr) throw "Attribute name not specified";
		if(!val) throw "Value not specified";
		if(!tag) tag="*";
		return this._initNew(weedAttrVal(this.gebtn(tag,parent).e,attr,val));
	}
	NUTHATCH.fn.gebav.component = component;
	NUTHATCH.fn.getElementsByAttributeValue=NUTHATCH.fn.gebav;

	/** 
	 * filterElementsByAttributeValue
	 * Returns all elements in a collection that have a given attribute 
	 * with a given value.  The val parameter can be a string value or a RegExp.
	 * If no elems are provided then the current collection is used.
	 */
	NUTHATCH.fn.febav = function(attr,val,tag,elems){
		if(!attr) throw "Attribute name not specified";
		if(!val) throw "Value not specified";
		if(!tag)tag="*";
		return this._initNew(weedAttrVal(this.febtn(tag,elems).e,attr,val));
	};
	NUTHATCH.fn.febav.component = component;
	NUTHATCH.fn.filterElementsByAttributeValue=NUTHATCH.fn.febav;

	//Internal use--checks an element for an attribute with a specified value and returns true or false
	var cmpAttrVal = function(elem,attr,val){
		var ret;
		var currVal=null;
		if(elem[attr]) currVal=elem[attr];
		else if(elem.getAttribute && elem.getAttribute(attr)) currVal=elem.getAttribute(attr);
		if(val instanceof RegExp) ret=val.test(currVal);
		else ret=currVal===val;
		return ret;
	}
	//Internal use--returns only the items in elems that have an attribute named attr with a value that matches val; see cmpAttrVal
	var weedAttrVal = function(elems,attr,val){
		var ret=[];
		for(var i=0;i<elems.length;i++){
			if(cmpAttrVal(elems[i],attr,val))ret.push(elems[i]);
		}
		return ret;
	}

	/**
	 * getElementsByAttribute
	 * Returns all elements (filtered by tag name) with a given attribute,
	 * even if the attribute has no value.
	 */
	NUTHATCH.fn.geba = function(attr, tag, parent){
		if(!attr) throw "Attribute name not specified";
		if(!tag) tag="*";
		return this._initNew(weedAttr(this.gebtn(tag,parent).e,attr));
	}
	NUTHATCH.fn.geba.component = component;
	NUTHATCH.fn.getElementsByAttribute=NUTHATCH.fn.geba;
	
	/**
	 * filterElementsByAttribute
	 * Returns all elements in the current collection with a specified tag name and attribute name.
	 * Specify "*" for tag to get all tags with the attribute.
	 */
	 NUTHATCH.fn.feba = function(attr,tag){
		if(!attr) throw "Attribute name not specified";
		if(!tag) tag="*";
		 return this._initNew(weedAttr(this.febtn(tag).e,attr));
	 }
	 NUTHATCH.fn.feba.component = component;
	 NUTHATCH.fn.filterElementsByAttribute=NUTHATCH.fn.feba;

	var weedAttr=function(elems,attr){
		var ret=[];
		for(var i=0;i<elems.length;i++){
			if(elems[i].hasAttribute && elems[i].hasAttribute(attr)){
				ret.push(elems[i]);
			}
			else if(elems[i][attr]){
				ret.push(elems[i]);
			}
		}
		return ret;
	}

	/**
	 * getElementsByPartialAttributeValue
	 * Returns all elements that have a specified attribute that equals or contains a value.
	 * Deprecated--use a regex expression with getElementsByAttributeValue instead
	 * Better yet, I'm going to comment out, it's just not needed
	 */
	/*
	NUTHATCH.fn.getElementsByPartialAttributeValue = function(tag, attr, val, parent) 
	{
		re = new RegExp(val);
		return this.gebav(tag, attr, re, parent);
	}
	NUTHATCH.fn.getElementsByPartialAttributeValue.component = component;
	*/
	
	/**
	 * getElementsByClassName
	Searches the descendants of the parent argument for elements of the type 
	specified by the tag argument, and with a class value specified by the className argument.
	*/
	NUTHATCH.fn.gebcn = function(className, tag, context) {
		if(!className) throw "Class name not specified";
		if(!tag) tag="*";
		return this._initNew(weedClass(this.gebtn(tag,context).e,className));
	}
	NUTHATCH.fn.gebcn.component = component;
	NUTHATCH.fn.getElementsByClassName=NUTHATCH.fn.gebcn;

	/**
	 * filterElementsByClassName
	 * Returns the elements in the current collection that have a specified class name
	 */ 
	NUTHATCH.fn.febcn = function(className, context) {
		if(!className) throw "Class name not specified";
		var e = this._getContext(context,true);
		return this._initNew(weedClass(e,className));
	}
	NUTHATCH.fn.febcn.component=component;
	NUTHATCH.fn.filterElementsByClassName=NUTHATCH.fn.febcn;
	
	var weedClass=function(elems,className){
		var ret=[];
		var re = new RegExp('(\\s|^)' + className + '(\\s|$)');
		for(var i=0;i<elems.length;i++){
			if(elems[i].className.match(re)){
				ret.push(elems[i]);
			}
		}
		return ret;
	}

	/**
	 * getPreviousSibling
	* Returns the previous sibling element of an element, if one exists.
	* If no parameter is passed, then the first element in the current instance is used instead. 
	**/
	NUTHATCH.fn.gps = function(elem) { 
		if(elem instanceof NUTHATCH)elem = elem.e[0];
		else if(elem && elem.length)elem = elem[0];
		if(!this.isNode(elem))elem=this.e[0];
		return this._initNew(getSibling(elem,"prev"));
	}
	NUTHATCH.fn.gps.component = component;
	NUTHATCH.fn.getPreviousSibling=NUTHATCH.fn.gps;

	/**
	 * getNextSibling
	 * Returns the next sibling element of an element, if one exists.
	 * If elem is not specified, then the first element of the current instance is used instead.
	**/
	NUTHATCH.fn.gns = function(elem) { 
		if(elem instanceof NUTHATCH)elem = elem.e[0];
		else if(elem && elem.length)elem = elem[0];
		if(!this.isNode(elem))elem=this.e[0];
		return this._initNew(getSibling(elem,"next"));
	}
	NUTHATCH.fn.gns.component = component;
	NUTHATCH.fn.getNextSibling = NUTHATCH.fn.gns;
	
	var getSibling=function(elem,dir){
		var ret=[];
		var tempNode;
		if(elem && getSibling2(elem,dir)) tempNode=elem;
		if(tempNode){
			tempNode = getSibling2(elem,dir);
			while(typeof(tempNode)!='undefined' && !this.isElement(tempNode)) {
				tempNode=getSibling2(tempNode,dir);
			}
		}
		if(tempNode) ret.push(tempNode);
		return ret;
	}
	var getSibling2=function(elem,dir){
		if(dir=="next")return elem.nextSibling;
		if(dir=="prev")return elem.previousSibling;
	}

	/**
	 * getNthChild
	* Returns the nth child of element, if found.
	* The first element of the current collection is the parent unless context is specified, and has an element (with a nodeType value)
	* If the call is unchained and no context is specified, this returns an empty NUTHATCH object (context does not default to document)
	**/
	NUTHATCH.fn.gnc = function(idx,context) {
		var parent;
		var ret = [];
		context = this._getContext(context,false);
		if(context.length)parent = context[0];
		if(parent){
			var tempNodes=parent.childNodes,ct=0;
			if(typeof(tempNodes)!='undefined'){
				for(var i=0;i<tempNodes.length;i++){if(this.isElement(tempNodes[i])){if(ct==idx)ret.push(tempNodes[i]);ct++;}}
			}
		}
		return this._initNew(ret);
	}
	NUTHATCH.fn.gnc.component = component;
	NUTHATCH.fn.getNthChild=NUTHATCH.fn.gnc;

	/**
	 * getNthElement
	 * Returns the nth Element (i.e, non-Element nodes are ignored) in the current collection, or of elem, if it is an element, or its first item is an element
	 * If the call is unchained and no context is specified, context defaults to all child nodes of html tag
	 */
	NUTHATCH.fn.gne = function(idx,context) {
		ret = [];
		var ct = 0;
		var e = this._getContext(context,true);
		if(e.length==1&&e[0]==document)e=document.getElementsByTagName("html")[0].childNodes;
		var max = e.length;
		for(var i=0;i<max;i++){
			if(this.isElement(e[i])){
				if(ct==idx){
					ret.push(e[i]);
					break;
				}
				ct++;
			}
		}
		return this._initNew(ret);
	}
	NUTHATCH.fn.gne.component = component;
	NUTHATCH.fn.getNthElement=NUTHATCH.fn.gne;

	/**
	 * getParent
	 * Returns the parentnode of the specified element.
	 * If the call is chained, the parent of the first element in the collection is returned.
	 * Otherwise, if the context specified is a NUTHATCH object, the parent node of the first element in it is returned.
	 * If it is an array or array-like object, the parent node of the first element is returned.
	 * The context defaults to the document, which has no parent.
	 */
	NUTHATCH.fn.gp = function(context){
		var ret = [];
		context = this._getContext(context,true);
		if(context.length){
			if(context[0].parentNode) ret.push(context[0].parentNode);
		}
		return this._initNew(ret);
	}
	NUTHATCH.fn.gp.component = component;
	NUTHATCH.fn.getParent=NUTHATCH.fn.gp;

	/**
	 * getChildren
	 * Returns the child nodes of the specified elements (this includes only Elements, i.e., nodes with nodeType=1)
	 * If the call is chained, the child nodes of the first element in the collection are returned.
	 * Otherwise, if the context is a NUTHATCH object, the child nodes of the first element of the object are returned.
	 * If the context is an array, the child nodes of the first element in the array are returned.
	 * If the context is an element, its childnodes are returned.
	 * The context defaults to the document.
	 */
	NUTHATCH.fn.gc = function(context){
		var ret = [];
		context = this._getContext(context,true);
		if(context.length)ret=this.makeArray(context[0].childNodes);
		else if(!this._chained)ret=this.makeArray(document.childNodes); 
		for(var i=0;i<ret.length;i++){
			if(this.isElement(ret[i])){
				ret.splice(i,1);
			}
		}
		return this._initNew(ret);
	}
	NUTHATCH.fn.gc.component = component;
	NUTHATCH.fn.getChildren=NUTHATCH.fn.gc;

}(NUTHATCH));
