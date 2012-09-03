var segment = {};
/*
segment.gender = "male";
segment.age = "31 to 49";
segment.region = "midwest";
segment.isFacebook = "yes";
*/
segment.getList = function() 
{
	var ret = [];
	for(var i in segment)
	{
		if(segment[i] && segment[i].length > 0)
		{
			ret[ret.length] = "profile." + i + "=" + segment[i];
		}
	}
	return ret;
}
