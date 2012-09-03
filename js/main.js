var nh = NUTHATCH();
$(document).ready(function() {
	//First load the cart from a cookie.  If no cookie found, an empty cart is created
	cart.load();
	
	$("#wrapper").css("visibility", "hidden");
	//The following if statements will build the page content, based on what kind of page it is
	if(util.isPage("billing"))
	{
		ui.buildBillingPage();
		readyBilling();
	}
	if(util.isPage("careers"))
	{
		ui.buildCareersPage();
	}
	if(util.isPage("cart"))
	{
		if(util.params["addprodid"])
		{
			cart.add(util.params["addprodid"]);
		}
		if(util.params["remove"])
		{
			cart.remove(util.params["remove"]);
		}
		ui.buildCartPage();
		readyCart();
	}
	if(util.isPage("category"))
	{
		ui.buildCategoryPage();
		readyCategory();
	}
	if(util.isPage("confirm"))
	{
		ui.buildOrderConfirmPage();
		readyOrderConfirm();
		cart.reset();
	}
	if(util.isPage("contact"))
	{
		ui.buildContactPage();
	}
	if(util.isPage("emailsignup"))
	{
		ui.buildEmailSignupPage();
	}
	if(util.isPage("home"))
	{
		ui.buildHomePage();
		readyHome();
	}
	if(util.isPage("info"))
	{
		ui.buildInfoPage();
	}
	if(util.isPage("noresult"))
	{
		ui.buildNoResultPage();
		readyNoResult();
	}
	if(util.isPage("product"))
	{
		ui.buildProductPage();
		readyProduct();
	}
	if(util.isPage("search"))
	{
		ui.buildSearchPage();
		readySearch();
	}
	ui.updateLinks();
	$("#wrapper").css("visibility", "visible");
});

if(typeof window.console === "undefined")
{
	var console = window.console = {};
	console.dummy = true;
	console.log = function() {};
	console.info = function() {};
	console.debug = function() {};
	console.error = function() {};
	console.group = function() {};
	console.groupEnd = function() {};
}

