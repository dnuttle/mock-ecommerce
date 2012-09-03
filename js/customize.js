function readyHome()
{
	//For POC of Discover "balance transfer" campaign
	jQuery("#main").append($("<div>")
		.attr("id", "test1")
		.addClass("test")
		.text("This is option 1")
	).append($("<div>")
		.attr("id", "test2")
		.addClass("test")
		.text("This is option 2")
	).append($("<div>")
		.attr("id", "test3")
		.addClass("test")
		.text("This is option 3")
	).append($("<div>")
		.attr("id", "test4")
		.addClass("test")
		.text("This is option 4")
	).append($("<div>")
		.attr("id", "test0")
		.addClass("test")
		.text("This is the default.  No mbox parameter value was found.")
	)
}

function readyCategory()
{
}

function readyCart()
{
}

function readyBilling()
{
}

function readyOrderConfirm()
{
}

function readyProduct()
{
}

function readySearch()
{
}

function readyNoResult()
{
}
