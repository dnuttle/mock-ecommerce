//Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-7765727-5']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//Piwik
/*
(function(siteid) {
	var util = {};
	util.baseurl = ("https:" === document.location.protocol) ? "https://piwik.nuttle.net/" : "http://piwik.nuttle.net/";
	util.loadJs = function()
	{
		try{
			var pa = document.createElement('script'); 
			pa.type='text/javascript'; 
			pa.async = true;
			pa.src = util.baseurl + "piwik.js";
			var ps = document.getElementsByTagName('script')[0]; 
			ps.parentNode.insertBefore(pa, ps);
		}catch(e){}
	}
	util.sendPiwik = function()
	{
		try{
			if(typeof Piwik==="undefined"){setTimeout(function() {util.sendPiwik();}, 200);}
			else
			{
				try {
					var piwikTracker = Piwik.getTracker(util.baseurl + "piwik.php", siteid);
					piwikTracker.trackPageView();
					piwikTracker.enableLinkTracking();
				} catch( err ) {}
			}
		}catch(e){alert("error")}
	}
	util.loadJs();
	util.sendPiwik();
})(3);
*/
