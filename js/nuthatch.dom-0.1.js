(function(NUTHATCH) {
	/**
	 * Cookie library provides for setting, reading and deleting cookies.
	*/
	var component = {
		name: "dom",
		version: "1.0"
	}
	NUTHATCH.fn.createElement = function(tag /*, [attr], [attr]*/){
		var e = document.createElement(tag);
		var attrs = arguments;
		attrs.shift();
		for(int i=0;i<attrs.length;i++)
		{
			var tmp = attrs[i].split("=");
			if(tmp.length==2)
			{
				if(typeof e[tmp[0]]!="undefined")
				{
					e[tmp[0]] = tmp[1];
				}
				else
				{
					e.setAttribute(tmp[0], tmp[1]);
				}
				/* Attrs to be investigated:
				 * className (class), htmlFor (for), tabIndex, accessKey, useMap, 
				 * All table-specific attrs like rowSpan and colSpan.
				 * 
				 * Also, IE can't set type of input tag? (Error)
				 * Or style of input tag (ignored)?
				 * Or "on" handlers that specify strings (ignored)?
				 * But can set "on" handlers when a function is passed; so could use eval?
				 * 
				 *  Also note that for attrs with boolean values, e.g. disabled, if you use setAttribute
				 * to set this to false, it's ignored.  Instead use removeAttribute.
				 * Note further though that you *can* use setAttribute on boolean attr in IE
				 */
			 }
		 }
		 return e;
	};
	NUTHATCH.fn.insertElement.component = component;
	
	NUTHATCH.fn.appendElement(elem, context)
	{
		//Set context to first element of current context
		//TODO
		//Append elem to context
		context.appendChild(elem);
	}
	NUTHATCH.fn.appendElement.component = component;

	NUTHATCH.fn.prependElement(elem, context)
	{
		//Set context to first element of current context
		//TODO
		//Append elem to context
		var sib = context.childNodes[0];
		if(sib)
		{
			document.insertBefore(sib, elem));
		}
		else
		{
			//Throw exception
		}
	}
	NUTHATCH.fn.prependElement.component = component;
	
	NUTHATCH.fn.insertElementBefore(elem, sibling)
	{
	}
	NUTHATCH.fn.insertElementBefore.component = component;

	NUTHATCH.fn.removeElement(elem)
	{
		var parent = elem.parentNode;
		if(parentNode)
		{
			parentNode.removeChild(elem);
			return elem;
		}
	}
	NUTHATCH.fn.removeElement.component = component;
	
	/**
	 * Return an attribute value for first element in context, if only name is specified
	 * Otherwise set the attribute to the value in first element in context
	 */
	NUTHATCH.fn.attr(name, value)
	{
	}
	NUTHATCH.fn.attr.component = component;
	
}())
