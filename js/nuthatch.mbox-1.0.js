(function(NUTHATCH) {
	
	var component = {
		name:"mbox",
		version:"1.0"
	}
	/**
	 * Get the value of a parameter for a specified mbox.
	 * E.g. "clicked=cta".
	 * If mbox or name are not provided, an exception is thrown.
	 * NOTE that dynamic mboxes (created with mboxDefine) will never contain parameters, so this method will return undefined.
	 * This method works only with static (mboxCreate) mboxes.
	 * @mbox: Reference to mbox.  Required.
	 * @name: Name of mbox parameter.  Required.
	 */
	NUTHATCH.fn.getMboxParameterValue = function(mbox, name) {
		if(!mbox || !name) throw "Mbox or parameter name not specified";
		if(!mbox.getParameters) return;
		var params = mbox.getParameters();
		var max = params.length;
		for(var i = 0; i < max; i+=1)
		{
			if(params[i].indexOf(name + "=")===0)
			{
				return params[i].substring(name.length + 1);
				break;
			}
		}
	};
	NUTHATCH.fn.getMboxParameterValue.component = component;
	
	/**
	 * Returns a reference to an mbox, if it exists
	 */
	NUTHATCH.fn.getMbox = function (mboxName){
		return mboxFactoryDefault.get(mboxName);
	}

	/**
	 * Defines an mbox if it does not already exist.
	 * Returns the mbox in any case.
	 */
	NUTHATCH.fn.defineMbox = function(mboxName,divId){
		if(!mboxName)throw "Mbox name not specified";
		var m = this.getMbox(mboxName);
		if(m) return m;
		//if(!divId)divId="mbox_div_" + mboxName;
		if(!divId)divId=getUniqueId(mboxName);
		var div=document.createElement("div");
		div.style.display = "none";
		div.id=divId;
		document.getElementsByTagName("body")[0].appendChild(div);
		return mboxDefine(divId,mboxName);
	}
	
	NUTHATCH.fn.updateMbox = function(){
		if(arguments.length==0 || !arguments[0])return;
		var mbox = this.getMbox(arguments[0]);
		if(!mbox) mbox = this.defineMbox(arguments[0]);
		mboxUpdate.apply(null, arguments);
	}

	var getUniqueId = function(mboxName)
	{
		var ct = 0;
		var found = true;
		var id;
		while(found)
		{
			id = "ad_mbox_" + mboxName + "_" + ct;
			var e = document.getElementById(id);
			if(!e)found=false;
			ct++;
		}
		return id;
	}

}(NUTHATCH));
