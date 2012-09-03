(function(NUTHATCH) {
	
	var component = {
		name:"event",
		version:"1.0"
	}
	/** 
	 * Pass functions to loaded that should be run when page has finished loading.
	 * They will run in the order they are passed.
	 * @fn: A function to be executed on page load.  Required.
	 */
	var cachedFunctions = [];
	NUTHATCH.fn.onload = function(fn) {
		if(typeof(fn)!=="function") throw "Function not specified";
		if(cachedFunctions.length==0) {
			NUTHATCH.addEvent(window, 'load', function() {
				for(var i = 0; i < cachedFunctions.length; i+=1) {
					var fn = cachedFunctions[i];
					fn();
				}
			});
		}
		cachedFunctions.push(fn);
		return this;
	}
	NUTHATCH.fn.onload.component = component;

	/**
	 * Returns the array of cached functions passed to the onload method.
	 * This method is *not* chainable.
	 */
	NUTHATCH.fn.onload.getCachedFunctions = function() {
		return cachedFunctions;
	}
	NUTHATCH.fn.onload.getCachedFunctions.component = component;

	/**
	 * Adds and returns an event handler.  Cross-browser compatible.
	 * Very old browsers will get an inline handler.
	 * A reference to the function is returned.
	 * This method is *not* chainable.
	 * @elem: An HTML element.  Required.
	 * @evt: The name of an event, e.g., "click" or "change".  Do not include "on", e.g., "onclick".  Required.
	 * @fn: The function to be executed when the event is fired.  Required.
	 */
	NUTHATCH.fn.addEvent = function(elem, evt, fn) {
		if(!elem || !evt || !fn) throw "Element, event or function not specified";
		if(elem.addEventListener) {
			elem.addEventListener(evt, fn, false);
		}
		else if(elem.attachEvent) {
			elem.attachEvent('on' + evt, fn);
		}
		else {
			elem['on' + evt] = fn;
		}
		return fn;
	}
	NUTHATCH.fn.addEvent.component = component;

	/**
	 * Removes an event handler, if found.
	 * Only works if the handler was added using addEventListener or attachEvent (or this library's addEvent).
	 * @elem: The HTML element from which an event handler will be removed.  Required.
	 * @evt: The event name for which an event will be removed.  Required.
	 * @fn: The event handler to be removed.  Required.
	 */
	NUTHATCH.fn.removeEvent = function(elem, evt, fn) {
		if(!elem || !evt || !fn) throw "Element, event or function not specified";
		if(elem.removeEventListener)
		{
			elem.removeEventListener(evt, fn, false);
		}
		else if(elem.detachEvent) 
		{
			elem.detachEvent("on" + evt, fn);
		}
		return this;
	}
	NUTHATCH.fn.removeEvent.component = component;

	/**
	 * Prevents the default action for an event.
	 * @evt: An event handler.  Required.
	 */
	NUTHATCH.fn.preventDefault = function(evt) {
		if(!evt) throw "No event handler specified";
		if(evt.preventDefault) evt.preventDefault();
		else evt.returnValue = false;
		return this;
	}
	NUTHATCH.fn.preventDefault.component = component;

	/**
	 * Stops propagation of an event.
	 * @evt: An event handler.  Required.
	 */
	NUTHATCH.fn.stopPropagation = function(evt) {
		if(!evt) throw "No event handler specified";
		if(window.event) window.event.cancelBubble = true;
		if(evt.stopPropagation) evt.stopPropagation();
		return this;
	}
	NUTHATCH.fn.stopPropagation.component = component;
	
	/**
	 * Cross-browser method to fire an event.
	 * @element: The element whose event will be fired.  Required.
	 * @eventName: The name of the event to be fired (do not include "on").  Required.
	 */
	NUTHATCH.fn.fireEvent = function(element,eventName) {
		if(!element || !eventName) throw "Element or event name not specified";
		if (document.createEventObject) {
			// dispatch for IE
			var event = document.createEventObject();
			if (eventName.toLowerCase().substr(0,2)!="on")
			eventName = "on" + eventName;
			element.fireEvent(eventName,event);
		} else {
			// dispatch for firefox + others
			var event = document.createEvent("MouseEvents");
			if (eventName.toLowerCase().substr(0,2)=="on")
				eventName = eventName.substr(2);
			event.initMouseEvent(eventName, true, true, document.defaultView, 0, 100, 0, 0, 0, false, false, false, false, 0, null);
			element.dispatchEvent(event);
		};
		return this;
	};
	NUTHATCH.fn.fireEvent.component = component;
}(NUTHATCH));
