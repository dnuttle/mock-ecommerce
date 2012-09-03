(function(NUTHATCH) {
	
	var component = {
		name:"css",
		version:"1.0",
		dependencies:["NUTHATCH.core-1.0","NUTHATCH.selector-1.0"]
	}
	/**
	 * Return true if an element has a class.  If context has more than one element, only the first is checked,
	 * unless checkAll is true, in which case all elements are tested.
	 * This method is *not* chainable.
	 * Context does not default to document.
	 */
	NUTHATCH.fn.hasClass = function(className, checkAll, context) {
		if(!className) throw "No class name specified";
		context = this._getContext(context,false);
		if(!checkAll===true){
			return this._has(className, context[0]);
		}else{
			var OK = true;
			var $this = this;
			this.each(context, function(idx,item){
				if(!$this._has(className, context[i]))OK=false;
			});
			return OK;
		}
	}
	NUTHATCH.fn.hasClass.component = component;
	
	/**
	 * Internal use only
	 */
	NUTHATCH.fn._has = function(className, el) {
		var re = new RegExp('(\\s|^)' + className + '(\\s|$)');
		if(!el || !el.className)return false;
		return re.test(el.className);
	}

	/** 
	 * Add a class to element(s), if not already present.
	 * Context does not default to document.
	 */
	NUTHATCH.fn.addClass = function(className, context) {
		if(!className)throw "No class name specified";
		var ctx2 = this._getContext(context,false);
		var $this = this;
		this.each(ctx2, function(idx, item){
			$this._add(className, item);
		});
		//If the call is unchained, and a context was specified, return a new instance flagged as chained
		if(context && !this._chained) return this._initNew(ctx2);
		//Otherwise return current instance, whether chained or unchained
		else return this;
	}
	NUTHATCH.fn.addClass.component = component;

	/**
	 * Internal use only
	 */
	NUTHATCH.fn._add = function(className, elem){
		var $this = this;
		if(!$this._has(className, elem)) {
			elem.className = $this.trim($this.trim(elem.className) + " " + className);
		}
	};
	
	/** 
	 * Remove a class from element(s), if found.
	 * Context does not default to document.
	 */
	NUTHATCH.fn.removeClass = function(className, context) {
		if(!className) throw "No class name specified";
		var ctx2 = this._getContext(context,false);
		var $this = this;
		this.each(ctx2, function(idx, item){
			$this._remove(className, item);
		});
		//If the call is unchained, and a context was specified, return a new instance flagged as chained
		if(context && !this._chained) return this._initNew(ctx2);
		//Otherwise return current instance, whether chained or unchained
		else return this;
	}
	NUTHATCH.fn.removeClass.component = component;

	/**
	 * Internal use only
	 */
	NUTHATCH.fn._remove = function(className, elem){
		if(elem && elem.className){
			var re = new RegExp('(\\s|^)' + className + '(\\s|$)', 'g');
			var newclass = this.trim(elem.className.replace(re, " "));
			newclass = newclass.replace(/  /g, " ");
			elem.className = newclass;
		}
	};
	
	/**
	 * Adds a class to element(s) if not present, otherwise removes it.
	 * Context does not default to document.
	 */
	NUTHATCH.fn.toggleClass = function(className, context) {
		if(!className) throw "No class name specified";
		var ctx2 = this._getContext(context, false);
		var $this = this;
		this.each(ctx2, function(idx, item){
			if($this._has(className, item)) {$this._remove(className, item);} else {$this._add(className, item)};
		});
		//If the call is unchained, and a context was specified, return a new instance flagged as chained
		if(context && !this._chained) {
			return this._initNew(ctx2);
		}
		//Otherwise return current instance, whether chained or unchained
		else {
			return this;
		}
	}
	NUTHATCH.fn.toggleClass.component = component;

	/**
	* This will add to an existing style, if it already exists, or create it, if it doesn't.
	* the insertRule method is for DOM browsers, the addRule method is for IE.
	* NOTE:  I got security errors when trying to use this in IE when page was still loading.
	* The addCss methods are preferred to this one.
	* Note that any context is ignored.
	*/
	NUTHATCH.fn.updateStyle = function(styleName, styleDef)
	{
		if(!styleName || !styleDef) throw "Style name or definition not specified";
		if(document.styleSheets.length==0)
		{
			document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
		}
		var styles = document.styleSheets[document.styleSheets.length-1];
		if(styles.cssRules)styles.insertRule(styleName + ' { ' + styleDef + ' } ',styles.cssRules.length);
		else if(styles.rules) {var newStyle = document.createStyleSheet();newStyle.addRule(styleName, styleDef);}
		return this;
	}
	NUTHATCH.fn.updateStyle.component = component;

	/**
	 * This will write a style tag into the head along with any CSS provided.
	 * If media is specified, value is added as "media" attribute.
	 * Any context is ignored.
	 */
	NUTHATCH.fn.addCssToHead = function(cssStr, media) {
		if(!cssStr) throw "CSS string not specified";
		var headElem = document.getElementsByTagName('head')[0];
		if (headElem) {
			var styleElem = document.createElement('style');
			styleElem.setAttribute("type","text/css");
			if(media) {
				styleElem.setAttribute("media", media);
			}
			if (styleElem.styleSheet)
				styleElem.styleSheet.cssText = cssStr;
			else
				styleElem.appendChild(document.createTextNode(cssStr));
			headElem.appendChild(styleElem);
		}
		return this;
	}
	NUTHATCH.fn.addCssToHead.component = component;
	
	/**
	 * This will accept an object, iterate all of its properties, and write each of them as a style using addCssTo Head.
	 * Any context is ignored.
	 */
	NUTHATCH.fn.addCssObjectToHead = function(o) {
		if(!o) throw "CSS object not specified";
		var cssStr = "";
		for(var itm in o) {
			cssStr += itm + " { \r\n";
			for(var style in o[itm]) {
				cssStr += "\t" + style + ": " + o[itm][style] + ";\r\n";
			}
			cssStr += "}\r\n";
		}
		this.addCssToHead(cssStr);
		return this;
	}
	NUTHATCH.fn.addCssObjectToHead.component = component;
	
	/**
	 * This will write any text found in any style tag with a specified type value into a new style tag in document head.
	 * Any context is ignored.
	 */
	NUTHATCH.fn.addCssTagsToHead = function(tagType,media,parent){
		if(!tagType) tagType = "text/adobe";
		if(typeof parent == "undefined") parent=document;
		var styleTags = this.getElementsByAttributeValue("style","type",tagType,parent);
		var css = "";
		for(var i=0;i<styleTags.elements.length;i++){
			css = css + styleTags.elements[i].innerHTML + "\r\n";
		}
		if(css){
			var head = document.getElementsByTagName("head")[0];
			if(head){
				var newTag = document.createElement("style");
				if(media) newTag.setAttribute("media",media);
				var txtNode = document.createTextNode(css);
				newTag.appendChild(txtNode);
				newTag.setAttribute("type", "text/css");
				head.appendChild(newTag);
			}
		}
		return this;
	}
	NUTHATCH.fn.addCssTagsToHead.component = component;

	NUTHATCH.fn.addCssTagsToHead = function(typ, media){
		if(typeof typ == "undefined"){typ="text/adobe"}
		var tags = document.getElementsByTagName("style");
		if(tags.length==0) return;
		var css = "";
		for(var i=0;i<tags.length;i++){
			if(tags[i].getAttribute("type")==typ){
				var tag = tags[i];
				css = css + tag.innerHTML + "\r\n";
			}
		}
		if(css){
			this.addCssToHead(css, media);
		}
		return this;
	}


}(NUTHATCH));
