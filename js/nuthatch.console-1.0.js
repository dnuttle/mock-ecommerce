(function(NUTHATCH) {
	var component = {
		name:"console",
		version:"1.0"
	}
	/**
	 * console will be a default implementation of the console object, if one exists.
	 * Otherwise it will be an object with a do-nothing log function.
	 * Note that no other methods (such as error or warn) are implemented, but can be added.
	 */
	NUTHATCH.fn.console = (window.console || {});
	NUTHATCH.fn.console.component = component;
	var nativeLogger = (NUTHATCH.fn.console.log ? true : false);
	NUTHATCH.fn.console.overrideLog = function(f) { if(!nativeLogger) {
			if(this.console)
			this.console.log = f;
		}
	} 
	NUTHATCH.fn.console.overrideLog(function() {});
}(NUTHATCH));
