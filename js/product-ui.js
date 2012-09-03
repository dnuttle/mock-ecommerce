var ui = {};

//Page-building methods
ui.buildHomePage = function()
{
	ui.buildTopNav();
	$("#main div.banner").html("").flash({src:"images/freeshipping.swf", width:468, height:60});
	//$("#right div.banner").html("").flash({src:"images/vertical01.swf", width:80, height:210});
	$("#right div.banner").html("").append(ui.getImage("images/vertical_free_shipping.png", "Free shipping", "Free shipping"));
	$("#leftnavtitle").text("Categories").show();
	ui.buildLeftNavLinks();
	ui.showCartWidget();
	jQuery("div#main > div.banner").after(jQuery("<p>").addClass("header1").text("Featured Products"));
	jQuery("div#main div.product-box:eq(0)").before(ui.buildFacebookLink());
	ui.buildFooter();
	ui.buildFancybox();
	jQuery("div#footer .inner").append("&nbsp;").append(jQuery("<a>")
		.addClass("fancybox_link")
		.attr("href","#fancybox_example")
		.text("Popup Example")
	)
	jQuery(".fancybox_link").fancybox();
	ui.buildFeaturedProducts();
}

ui.buildFeaturedProducts = function() {
	var featured = jQuery("<div>").attr("id","featured_products");
	$("#main").append(featured);
	$.getJSON("ajax/top_products.htm",function(data) {
		$.each(data, function(key, val) {
			$(featured).append(ui.buildProductBox(eval(val.prod)));
			ui.updateLinks();
		});
	})
}

ui.buildProductPage = function()
{
	ui.buildTopNav();
	$("#leftnavtitle").text("Promotions").show();
	ui.showCartWidget();
	var prodid = util.params["prodid"];
	$("#leftnavtitle").css("visibility", "hidden");
	if(typeof prodid === "string" && prodid.length > 0)
	{
		var prod = products.find(prodid);
		if(!prod) return;
		$("#main")
		.append($("<h3>")
		.text(prod.title)
		)
		.append($("<div>")
			.append($("<img>")
				.css("float", "left")
				.css("margin-right", "6px")
				.attr("src", "images/" + prod.prodid + ".jpeg")
			)
			.append($("<p>")
				.text(prod.desc)
			)
			.append($("<p>")
				.text("$" + prod.price)
			)
			.append($("<div>")
				.addClass("clear")
			)
			.append($("<a>")
				.attr("href", "addprodid="+prod.prodid)
				.addClass("button")
				.addClass("internal")
				.addClass("cart")
				.text("Add to Cart")
			)
			
		)
	}
	ui.buildFooter();
}

ui.buildCategoryPage = function() 
{
	ui.buildTopNav();
	$("#main div.banner").append(ui.getImage("images/banner02.png"));
	//$("#right div.banner").html("").flash({src:"images/vertical02.swf", width:80, height:210});
	$("#right div.banner").html("").append(ui.getImage("images/vertical_free_shipping.png", "Free shipping", "Free shipping"));
	$("#leftnavtitle").text("Categories").show();
	ui.buildLeftNavLinks(util.params.catid);
	ui.showCartWidget();
	ui.buildCategoryProducts(util.params.catid);
	ui.buildFooter();
}


ui.buildContactPage = function() {
	ui.buildTopNav();
	ui.buildFooter();
}

ui.buildEmailSignupPage = function() {
	ui.buildTopNav();
	ui.buildFooter();
}

ui.buildInfoPage = function() {
	ui.buildTopNav();
	ui.buildFooter();
}

//Add the products for a category to div#main
ui.buildCategoryProducts = function(catid)
{
	if(typeof catid !== "string") {
		location.href = config.singlePageMode ? config.singlePageName + "?page=noresult" : "noresult.htm";
		return;
	}
	var prods;
	function recurseCategory(catid, cat){
		if(cat && cat.catid==catid){
			return cat;
		}else{
			for(var x in cat){
				if(cat[x].length && cat[x].catid){
					return recurseCategory(catid, cat[x]);
				}
			}
		}
	};
	//prods = recurseCategory(catid, products);
	prods = products.getCategory(catid);
	if(!prods)return;
	jQuery.each(prods, function(idx, prod) {
		$("#main").append(ui.buildProductBox(prod));
	});
}

ui.buildBillingPage = function() 
{
	ui.buildTopNav();
	$("#main").append($("<p>")
		.addClass("header1")
		.text("Billing Information")
	)
	.append($("<form>")
		.attr("name", "confirm")
		.attr("action", config.singlePageMode ? config.singlePageName : "confirm.htm")
		.attr("method", "GET")
		.append($("<label>")
			.addClass("formlabel")
			.attr("for", "name")
			.text("Name: ")
		)
		.append($("<input>")
			.attr("type", "text")
			.attr("name", "name")
			.attr("id", "name")
			.attr("value", "John Smith")
		)
		.append($("<br>"))
		.append($("<label>")
			.addClass("formlabel")
			.attr("for", "addr")
			.text("Address: ")
		)
		.append($("<input>")
			.attr("type", "text")
			.attr("name", "addr")
			.attr("id", "addr")
			.attr("value", "101 Main St.")
		)
		.append($("<br>"))
		.append($("<label>")
			.addClass("formlabel")
			.attr("for", "city")
			.text("City: ")
		)
		.append($("<input>")
			.attr("type", "text")
			.attr("name", "city")
			.attr("id", "city")
			.attr("value", "Centerville")
		)
		.append($("<br>"))
		.append($("<label>")
			.addClass("formlabel")
			.attr("for", "state")
			.text("State: ")
		)
		.append($("<input>")
			.attr("type", "text")
			.attr("name", "state")
			.attr("id", "state")
			.attr("value", "IL")
		)
		.append($("<br>"))
		.append($("<label>")
			.addClass("formlabel")
			.attr("for", "zip")
			.text("ZIP: ")
		)
		.append($("<input>")
			.attr("type", "text")
			.attr("name", "zip")
			.attr("id", "zip")
			.attr("value", "60606")
		)
		.append($("<hr>"))
		.append($("<label>")
			.addClass("formlabel")
			.attr("for", "cardtype")
			.text("Card Type: ")
		)
		.append($("<input>")
			.attr("type", "text")
			.attr("name", "cardtype")
			.attr("id", "cardtype")
			.attr("value", "VISA")
		)
		.append($("<br>"))
		.append($("<label>")
			.addClass("formlabel")
			.attr("for", "cardno")
			.text("Card No.: ")
		)
		.append($("<input>")
			.attr("type", "text")
			.attr("name", "cardno")
			.attr("id", "cardno")
			.attr("value", "4444333322221111")
			.attr("disabled", "true")
		)
		.append($("<input>")
			.attr("type", "hidden")
			.attr("name", "page")
			.attr("id", "page")
			.attr("value", "confirm")
		)
		.append($("<p>")
			.addClass("alert")
			.text("This is not a real site.  This is a phony card number.")
		)
		.append($("<hr>"))
		.append($("<a>")
			.attr("href", "javascript:void(0)")
			.click(function() {
				document.forms["confirm"].submit();
			})
			.addClass("button")
			.text("Submit >>")
		)
		.append($("<br>"))
	);
	$("#leftnav div.banner").append(ui.getImage("images/banner200_05.png"));
	$("#leftnav .header1:eq(0)").text("Important Info");
	$("#leftnav").append($("<p>").text("Secure Payment"));
	$("#main .header1:eq(0)").text("Shopping Cart");
	ui.buildFooter();
}

ui.buildOrderConfirmPage = function() 
{
	ui.buildTopNav();
	$("#leftnav .header1:eq(0)").text("Offers");
	$("#main .header1:eq(0)").text("Order Completed");
	$("#main")
	.append($("<p>")
		.text("THANK YOU")
	)
	.append($("<p>")
		.text("Your Bogus Values order has been submitted.  You won't get anything, but hey, it didn't cost you anything.")
	)
	.append($("<br>"))
	.append($("<br>"));
	
		$("#main").append($("<div>")
			.append($("<span>")
				.css("display", "inline-block").css("width", "45px").css("background-color", "#DDDDDD")
				.text("ID")
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "200px").css("background-color", "#DDDDDD")
				.text("Title")
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "75px").css("background-color", "#DDDDDD")
				.text("Price")
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "60px").css("background-color", "#DDDDDD")
				.text("Qty.")
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "80px").css("background-color", "#DDDDDD")
				.text("Total")
			)
		);
	jQuery.each(cart.items, function(idx, item) {
		$("#main").append($("<div>")
			.append($("<span>")
				.css("display", "inline-block").css("width", "45px")
				.text(item.product.prodid)
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "200px")
				.text(item.product.title)
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "75px")
				.text(item.product.price)
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "60px")
				.text(item.qty)
			)
			.append($("<span>")
				.css("display", "inline-block").css("width", "80px")
				.text(item.qty * item.product.price)
			)
		);
	});
	
	$("#main")
		.append($("<br>"))
		.append($("<a>")
		.addClass("internal")
		.addClass("home")
		.attr("href", "")
		.addClass("button")
		.text("Home")
	);
	ui.buildFooter();
}

ui.buildCartPage = function()
{
	ui.buildTopNav();
	if(cart.items.length===0)
	{
		$("#main div.banner").append(ui.getImage("images/banner03.png"));
		$("#leftnav div.banner").append(ui.getImage("images/banner200_05.png"));
	}
	else
	{
		$("#leftnav div.banner").html("").append(
			ui.getImage("images/banner200_01.png")
		)
		.append(
			ui.getImage("images/banner200_02.png")
		)
		.append(
			ui.getImage("images/banner200_03.png")
		);	
	}
	//$("#right div.banner").html("").flash({src:"images/vertical02.swf", width:"80", height:"210"});
	$("#right div.banner").html("").append(ui.getImage("images/vertical_free_shipping.png", "Free shipping", "Free shipping"));
	ui.buildCartProducts();
	$("#leftnav .header1:eq(0)").text("Important Info");
	$("#leftnav").append($("<p>").text("Secure Payment"));
	$("#main .header1:eq(0)").text("Shopping Cart");
	$("#main").append($("<div class='buttons'>")
		.css("margin-bottom", "8px")
		.append($("<a>")
			.attr("href", "")
			.addClass("button")
			.addClass("internal")
			.addClass("home")
			.text("Continue Shopping")
		)
	);
	if(cart.items.length > 0)
	{
		$("#main div.buttons")
			.append($("<a>")
				.attr("href", "")
				.addClass("button")
				.addClass("internal")
				.addClass("billing")
				.text("Checkout >>")
		);
	}
	ui.buildFooter();
}

ui.buildSearchPage = function() 
{
	ui.buildTopNav();
	var prods = search.keyword(util.params["keyword"]);
	if(prods && prods.length>0)
	{
		ui.buildSearchProducts(search.keyword(util.params["keyword"]));
	}
	else
	{
		location.href = config.singlePageMode ? config.singlePageName + "?page=noresult" : "noresult.htm";
	}
	$("#main div.banner").append(ui.getImage("images/banner01.png"));
	ui.showCartWidget();
	ui.buildLeftNavLinks();
	ui.buildFooter();
}

ui.buildCareersPage = function() {
	ui.buildTopNav();
	ui.buildLeftNavLinks();
	ui.buildFooter();
}



//UTILITIES
ui.showCartWidget = function()
{
	$("#cartitems").text(cart.items.length + " item" + (cart.items.length != 1 ? "s" : ""));
	$("#cartwidget").css("display", "inline");
}

ui.build200Banner =  function(text)
{
	return $("<div>")
		.addClass("banner200")
		.append($("<span>")
			.text(text)
		)
}

ui.buildLeftNavLinks = function(catid)
{
	$(".navlinks").css("display", "block");
	if(typeof catid !== "string")
	{
		$("#leftnav ul.navlinks")
		.append(
			$("<li>")
			.text("Men")
			.append($("<ul>")
				.append(ui.buildLeftNavLink("2000", "Shirts"))
				.append(ui.buildLeftNavLink("1000", "Pants"))
			)
		)
		.append(
			$("<li>")
			.text("Women")
			.append($("<ul>")
				.append(ui.buildLeftNavLink("3000", "Skirts"))
				.append(ui.buildLeftNavLink("4000", "Tops"))
			)
		)
		.append(
			$("<li>")
			.text("Boys")
			.append($("<ul>")
				.append(ui.buildLeftNavLink("5000", "Shirts"))
				.append(ui.buildLeftNavLink("6000", "Pants"))
			)
		)
		.append(
			$("<li>")
			.text("Girls")
			.append($("<ul>")
				.append(ui.buildLeftNavLink("7000", "Shirts"))
				.append(ui.buildLeftNavLink("8000", "Pants"))
			)
		)
	}
	else
	{
		switch (catid) {
			case "1":
				$("#leftnav .banner").append(ui.build200Banner("Men"))
				$("#leftnav ul.navlinks")
				.append(ui.buildLeftNavLink("2000", "Shirts"))
				.append(ui.buildLeftNavLink("1000", "Pants"))
				break;
			case "2":
				$("#leftnav .banner").append(ui.build200Banner("Women"))
				$("#leftnav ul.navlinks")
				.append(ui.buildLeftNavLink("3000", "Skirts"))
				.append(ui.buildLeftNavLink("4000", "Tops"))
				break;
			case "3":
				$("#leftnav .banner").append(ui.build200Banner("Boys"))
				$("#leftnav ul.navlinks")
				.append(ui.buildLeftNavLink("5000", "Shirts"))
				.append(ui.buildLeftNavLink("6000", "Pants"))
				break;
			case "4":
				$("#leftnav .banner").append(ui.build200Banner("Girls"))
				$("#leftnav ul.navlinks")
				.append(ui.buildLeftNavLink("7000", "Shirts"))
				.append(ui.buildLeftNavLink("8000", "Pants"))
				break;
			case "1000":
				$("#leftnav .banner").append(ui.build200Banner("Mens Pants"));
				break;
			case "2000":
				$("#leftnav .banner").append(ui.build200Banner("Mens Shirts"));
				break;
			case "3000":
				$("#leftnav .banner").append(ui.build200Banner("Womens Skirts"));
				break;
			case "4000":
				$("#leftnav .banner").append(ui.build200Banner("Womens Tops"));
				break;
			case "5000":
				$("#leftnav .banner").append(ui.build200Banner("Boys Shirts"));
				break;
			case "6000":
				$("#leftnav .banner").append(ui.build200Banner("Boys Pants"));
				break;
			case "7000":
				$("#leftnav .banner").append(ui.build200Banner("Girls Tops"));
				break;
			case "8000":
				$("#leftnav .banner").append(ui.build200Banner("Girls Pants"));
				break;
			default:
				//Invalid subcat id, go to not found page
				location.href = config.singlePageMode ? config.singlePageName + "?page=noresult" : "noresult.htm";
				break;
		}
	}
}

ui.buildLeftNavLink = function(catid, name)
{
	return $("<li>").append($("<a>")
		.addClass("internal")
		.addClass("category")
		.attr("href", "catid=" + catid).text(name)
	);
}


//Build list of products on cart page
ui.buildCartProducts = function()
{
	jQuery.each(cart.items, function(idx, item) {
		$("#main").append(ui.buildCartProductBox(item));
	})
	if(cart.items.length===0)
	{
		$("#main").append($("<p>").text("The cart is empty.").css("margin-bottom", "35px")).append("<br>");
	}
}

ui.buildCartProductBox = function(item)
{
	return $("<div>")
		.addClass("product-box")
		.append($("<img>")
			.attr("src", "images/" + item.product.prodid + ".jpeg")
			.attr("width", "56")
			.attr("height", "68")
		)
		.append($("<span>")
			.addClass("prodtitle")
			.text(item.product.desc)
		)
		.append($("<span>")
			.text("Prod. No.: " + item.product.prodid)
		)
		.append($("<span>")
			.text("Quantity: " + item.qty)
		)
		.append($("<span>")
			.append($("<a>")
				.text("Remove")
				.addClass("button")
				.addClass("internal")
				.addClass("cart")
				.attr("href", "remove=" + item.product.prodid)
			)
		)
		.append($("<div>")
			.addClass("clear")
		)
}

ui.buildNoResultPage = function()
{
	ui.showCartWidget();
	$("#main").append($("<p>")
		.text("No results were found for your search.")
	);
	$("#leftnav div.banner").html("").append(ui.getImage("images/banner200_05.png"));
	ui.buildFooter();
}


ui.buildSearchProducts = function(prods)
{
	jQuery.each(prods, function(idx, prod) {
		$("#main").append(ui.buildProductBox(prod));
	});
}

//Build a product box with image, title, desc and price
ui.buildProductBox = function(prod)
{
	return $("<div>")
		.addClass("product-box")
		
		.append($("<span>")
			.addClass("product")
			.addClass("image")
		
			.append($("<a>")
				.attr("href", "prodid=" + prod.prodid)
				.addClass("internal")
				.addClass("product")
				.append($("<img>")
					.attr("src", "images/" + prod.prodid + ".jpeg")
					.attr("width", "56")
					.attr("height", "68")
				)
			)
		)
		.append($("<span>")
			.addClass("prodtitle")
			.append($("<a>")
				.attr("href", "prodid=" + prod.prodid + "&catid=" + prod.catid)
				.addClass("internal")
				.addClass("product")
				.text(prod.title)
			)
		)
		.append($("<span>")
			.addClass("description")
			.text(prod.desc)
		)
		.append($("<span>")
			.addClass("price")
			.text("Price: $" + prod.price)
		)
		.append($("<span>")
			.addClass("cart")
			.append($("<a>")
				.text("Add to Cart")
				.addClass("button")
				.addClass("internal")
				.addClass("cart")
				.attr("href", "addprodid="+prod.prodid)
			)
		)
		.append($("<div>")
			.addClass("clear")
		)
}

ui.buildFooter = function() {
	var inner = jQuery("<div>").addClass("inner");
	jQuery("div#footer").append(inner);
	inner
		.append(ui.createLink("#","Contact Us","internal contact"))
		.append("&nbsp;")
		.append(ui.createLink("#","Sign Up for Email","internal emailsignup"))
		.append("&nbsp;")
		.append(ui.createLink("#","Company Information","internal info"))
		.append("&nbsp;")
		.append(ui.createLink("#","Careers","internal careers"))
		.append("&nbsp;");
		
	jQuery("div#footer").removeClass("nodisplay");
	
	/*POC for sending mbox3rdPartyId.  The idea is that it only gets sent when you login, and even then,
	 * only once per the life of a PCID.
	 * There is an edge case where it could be sent more, when the visitor keeps coming back to the site without logging in.
	 * In that case, the mbox3rdPartyIdSent value will expire before the PCID, and so after 14 days, it would be sent again.
	 * In a server-side app, the mbox3rdPartyIdSent value would get set at every login, so this edge case would happen only
	 * if the user comes back to the site, without logging in, within 14 days after the last login.
	 * UPDATE:  This now sends an "expanded" mbox3rdPartyId, which is the value entered, plus ":", plus the six-digit random number in the PCID.
	 */

	var sent = mboxGetCookie('mbox3rdPartyIdSent');
	if(!sent)
	{
		jQuery("<input>").attr("type", "text").attr("id","login").appendTo(inner);
		jQuery("<button>").attr("id", "login").text("Login")
			.click(function(evt){
				var id = jQuery("#login").val();
				if(id)
				{
					var pcid = (mboxGetCookie('PC')||'').split('.')[0];
					if(sent!=pcid)
					{
						id = ui.getUserId(id);
						mboxFactoryDefault.getSignaler().signal('special','mboxClickTrack', 'mbox3rdPartyId='+id, 'profile.mbpid='+id);
					}
					mboxSetCookie('mbox3rdPartyIdSent',pcid,30*24*60*60);
				}
			})
			.appendTo(inner);
	}
}
ui.getUserId = function(baseId)
{
	if(mboxFactoryDefault && mboxFactoryDefault.getPCId && mboxFactoryDefault.getPCId().getId)
	{
		var pcid = mboxFactoryDefault.getPCId().getId();
		if(pcid)
		{
			var patt = /\d+-(.*?)\.\d+/;
			var result = pcid.match(patt);
			if(result[1]) return baseId + ":" + result[1];
			else return baseId;
		}
	}
}


ui.createLink = function(href, html, aclass) {
	return jQuery("<a>").attr("href",href).attr("class",aclass).html(html);
}

ui.updateLinks = function() {
	$("a.internal").each(function(idx, el) {
		if($(this).data("fixed")!=="true") {
			var page = "";
			for(var p in util.pages)
			{
				if($(this).hasClass(util.pages[p])) page = util.pages[p];
			}
			if(!p) p = "error";
			var href = $(this).attr("href");
			var pageName = util.getPageName();
			if(config.singlePageMode)
			{
				var idx = location.href.indexOf(pageName) + pageName.length;
				href = location.href.substring(0, idx) + "?page=" + page + (href.length>0 ? "&" + href : "");
			}
			else
			{
				var idx = location.href.indexOf(pageName);
				href = location.href.substring(0, idx) + page + ".htm" + 
					(href.length>0 ? "?" + href : "");
			}
			$(this).attr("href", href);
			$(this).data("fixed","true");
		}
	})
	if($("form[name=search]").data("search")!=="true") {
		$("form[name=search]").attr("action", config.singlePageMode ? config.singlePageName : "search.htm");
		$("form[name=search]").data("fixed","true");
	}
}

ui.getImage = function(src, alt, title) {
	var img = $("<img>").attr("src", src);
	if(alt) img.attr("alt", alt);
	if(title) img.attr("title", title);
	return img;
}

ui.buildTopNav = function() {
	$("div#topnav")
		.append(jQuery("<form>").attr("name","search").attr("action","").attr("method","GET").attr("value","search")
			.append(jQuery("<ul>").addClass("navbar")
				.append(jQuery("<li>").append(ui.createLink("catid=1", "MEN", "internal category")))
				.append(jQuery("<li>").append(ui.createLink("catid=2", "WOMEN", "internal category")))
				.append(jQuery("<li>").append(ui.createLink("catid=3", "BOYS", "internal category")))
				.append(jQuery("<li>").append(ui.createLink("catid=4", "GIRLS", "internal category")))
				.append(jQuery("<li>").append(ui.createLink("catid=999", "SALE", "internal category")))
				.append(jQuery("<li>")
					.append(jQuery("<label>").addClass("navbar").attr("for","keyword").text("Search"))
					.append("&nbsp;")
					.append(jQuery("<input>")
						.attr("type","text")
						.attr("name","keyword")
						.attr("id","keyword")
					)
					.append("&nbsp;")
					.append(jQuery("<input>")
						.attr("type","submit")
						.addClass("button")
						.attr("id","go")
						.attr("value","Go")
					)
				)
			)
		)
}

ui.buildFancybox = function() {
	jQuery("body").append(jQuery("<div>")
		.addClass("nodisplay")
		.append(jQuery("<div>")
			.attr("id","fancybox_example")
			.text("This is an example of a popup box.")
		)
	)
}

ui.buildFacebookLink = function() {
	return jQuery("<div>").addClass("facebook").append(
			jQuery("<iframe>")
			.attr("src","http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fstore.nuttle.net&amp;layout=standard&amp;show_faces=false&amp;width=450&amp;action=recommend&amp;font&amp;colorscheme=light&amp;height=35&amp;ref=home")
			.attr("scrolling","no")
			.attr("frameborder","no")
			.css("border","none").css("overflow","hidden").css("width","450px").css("height","35px")
			.attr("allowTransparency","true")
		)
}

