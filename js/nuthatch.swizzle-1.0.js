(function(NUTHATCH) {
	var component = {
		name:"swizzle",
		version:"1.0"
	}
	var Swizzler = function() {
		var self=this;
		self.timeout={maxWait:90000,interval:100,curr:0};
		self.timeout.timeoutFunc = function() {};
		this.swizzle=function() {
			var e=self.select();
			if(e){self.process(e);return;}
			self.wait(self.swizzle);
		};
		this.wait = function(f) {
			self.timeout.curr+=self.timeout.interval;
			if(self.timeout.curr>=self.timeout.maxWait){self.timeout.timeoutFunc();return;}
			setTimeout(f,self.timeout.interval);
		}
	};
	/**
	 * Returns an instance of the Swizzler object.
	 */
	NUTHATCH.fn.getSwizzler = function() { return new Swizzler(); }
	NUTHATCH.fn.getSwizzler.component = component;
	
	/**
	 * Convenience method creates Swizzler object and exposes properties
	 */
	NUTHATCH.fn.swizzle = function(select, process, timeoutFunc, maxWait, interval) {
		var s = new Swizzler();
		s.select = select;
		s.process = process;
		if(maxWait) s.timeout.maxWait = maxWait;
		if(interval) s.timeout.interval = interval;
		if(typeof timeoutFunc === "function") s.timeout.timeoutFunc = timeoutFunc;
		s.swizzle();
	}
	NUTHATCH.fn.swizzle.component = component;
}(NUTHATCH));
