var search = {};

search.keyword = function(phrase, catid)
{
	var prods = search.navigate(catid);
	var ret = [];
	var keywords = phrase.split("+");
	for(var i = 0; i < prods.length; i++)
	{
		var score = 0;
		var prod = prods[i];
		for(var k = 0; k < keywords.length; k++)
		{
			var keyword = keywords[k];
			var re = new RegExp(keyword, "i");
			if(prod.prodid===keyword)
			{
				score += 5;
			}
			if(prod.cat.search(re)>-1)
			{
				score += 5;
			}
			if(prod.title === keyword)
			{
				score += 4;
			}
			else if(prod.title.search(re)>-1)
			{
				score += 2;
			}
			if(prod.desc.search(re)>-1)
			{
				score += 1;
			}
		}
		if(score>0)
		{
			ret[ret.length] = prod;
			prod.score = score;
			console.log(prod.prodid + " " + prod.score);
		}
	}
	ret.sort(function(a, b) {
		return a.score < b.score ? 1 : a===b ? 0 : -1;
	});
	return ret;
}

search.navigate = function(catid)
{
	var prods;
	switch (catid) {
		case "1":
			prods = products.men;
			break;
		case "2":
			prods = products.women;
			break;
		case "3":
			prods = products.boys;
			break;
		case "4":
			prods = products.girls;
			break;
		case "1000":
			prods = products.men.pants;
			break;
		case "2000":
			prods = products.men.shirts;
			break;
		case "3000":
			prods = products.women.skirts;
			break;
		case "4000":
			prods = products.women.tops;
			break;
		case "5000":
			prods = products.boys.shirts;
			break;
		case "6000":
			prods = products.boys.pants;
			break;
		case "7000":
			prods = products.girls.tops;
			break;
		case "8000":
			prods = products.girls.pants;
			break;
		default:
			prods = products.all;
	}
	return prods;
}

