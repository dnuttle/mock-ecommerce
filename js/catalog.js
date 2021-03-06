var products = {};
products.all = [
	//Mens
	//Mens Pants
	{prodid: "1000",
	title: "Mens Pant 1000",
	desc: "mens pant",
	price: "59.00",
	cat: "men/pants"},
	{prodid: "1001",
	title: "Mens Pant 1001",
	desc: "mens pant",
	price: "79.00",
	cat: "men/pants"},
	{prodid: "1002",
	title: "Mens Pant 1002",
	desc: "mens pant",
	price: "69.00",
	cat: "men/pants"},
	{prodid: "1003",
	title: "Mens Pant 1003",
	desc: "mens pant",
	price: "119.00",
	cat: "men/pants"},
	{prodid: "1004",
	title: "Mens Pant 1004",
	desc: "mens pant",
	price: "89.00",
	cat: "men/pants"},
	{prodid: "1005",
	title: "Mens Pant 1005",
	desc: "mens pant",
	price: "99.00",
	cat: "men/pants"},
	//Mens Shirts
	{prodid: "2000",
	title: "Denim Shirt",
	desc: "European cut denim shirt 100% cotton",
	price: "49.00",
	cat: "men/shirts"},
	{prodid: "2001",
	title: "Plain Lines Shirt",
	desc: "Causal plaid shirt with blue and gray pattern",
	price: "79.00",
	cat: "men/shirts"},
	{prodid: "2002",
	title: "Downtown Striped Shirt",
	desc: "Vertical striped Downtown shirt 100% cotton",
	price: "89.00",
	cat: "men/shirts"},
	{prodid: "2003",
	title: "White Multi-Pocket Shirt",
	desc: "Dressy multi-pocket white shirt, European cut",
	price: "65.00",
	cat: "men/shirts"},
	{prodid: "2004",
	title: "Diamond Jim Shirt",
	desc: "Diamond Jim shirt cotton-synthetic blend",
	price: "73.00",
	cat: "men/shirts"},
	{prodid: "2005",
	title: "Slim Cut Shirt",
	desc: "Form-flattering slim-cut shirt",
	price: "52.00",
	cat: "men/shirts"},
	//Womens Skirts
	{prodid: "3000",
	title: "Womens Skirt 3000",
	desc: "womens skirt",
	price: "115.00",
	cat: "womens/skirts"},
	{prodid: "3001",
	title: "Womens Skirt 3001",
	desc: "womens skirt",
	price: "86.00",
	cat: "womens/skirts"},
	{prodid: "3002",
	title: "Womens Skirt 3002",
	desc: "womens skirt",
	price: "63.00",
	cat: "womens/skirts"},
	{prodid: "3003",
	title: "Womens Skirt 3003",
	desc: "womens skirt",
	price: "129.00",
	cat: "womens/skirts"},
	{prodid: "3004",
	title: "Womens Skirt 3004",
	desc: "womens skirt",
	price: "79.00",
	cat: "womens/skirts"},
	{prodid: "3005",
	title: "Womens Skirt 3005",
	desc: "womens skirt",
	price: "52.00",
	cat: "womens/skirts"},
	//Womens Tops
	{prodid: "4000",
	title: "Womens Top 4000",
	desc: "womens top",
	price: "105.00",
	cat: "women/tops"},
	{prodid: "4001",
	title: "Womens Top 4001",
	desc: "womens top",
	price: "80.00",
	cat: "women/tops"},
	{prodid: "4002",
	title: "Womens Top 4002",
	desc: "womens top",
	price: "65.00",
	cat: "women/tops"},
	{prodid: "4003",
	title: "Womens Top 4003",
	desc: "womens top",
	price: "53.00",
	cat: "women/tops"},
	{prodid: "4004",
	title: "Womens Top 4004",
	desc: "womens top",
	price: "88.00",
	cat: "women/tops"},
	{prodid: "4005",
	title: "Womens Top 4005",
	desc: "womens top",
	price: "70.00",
	cat: "women/tops"},
	//Boys Shirts
	{prodid: "5000",
	title: "Boys Shirt 5000",
	desc: "boys shirt",
	price: "29.00",
	cat: "boys/shirts"},
	{prodid: "5001",
	title: "Boys Shirt 5001",
	desc: "boys shirt",
	price: "22.00",
	cat: "boys/shirts"},
	{prodid: "5002",
	title: "Boys Shirt 5002",
	desc: "boys shirt",
	price: "33.00",
	cat: "boys/shirts"},
	{prodid: "5003",
	title: "boys shirt",
	desc: "Boys Shirt 5003",
	price: "35.00",
	cat: "boys/shirts"},
	{prodid: "5004",
	title: "Boys Shirt 5004",
	desc: "boys shirt",
	price: "27.00",
	cat: "boys/shirts"},
	{prodid: "5005",
	title: "Boys Shirt 5005",
	desc: "boys shirt",
	price: "25.00",
	cat: "boys/shirts"},
	//Boys Pants
	{prodid: "6000",
	title: "Boys Pant 6000",
	desc: "boys pant",
	price: "33.00",
	cat: "boys/pants"},
	{prodid: "6001",
	title: "Boys Pant 6001",
	desc: "boys pant",
	price: "42.00",
	cat: "boys/pants"},
	{prodid: "6002",
	title: "Boys Pant 6002",
	desc: "boys pant",
	price: "45.00",
	cat: "boys/pants"},
	{prodid: "6003",
	title: "Boys Pant 6003",
	desc: "boys pant",
	price: "36.00",
	cat: "boys/pants"},
	{prodid: "6004",
	title: "Boys Pant 6004",
	desc: "boys pant",
	price: "70.00",
	cat: "boys/pants"},
	{prodid: "6005",
	title: "Boys Pant 6005",
	desc: "boys pant",
	price: "55.00",
	cat: "boys/pants"},
	//Girls Tops
	{prodid: "7000",
	title: "Girls Top 7000",
	desc: "girls top",
	price: "38.00",
	cat: "girls/tops"},
	{prodid: "7001",
	title: "Girls Top 7001",
	desc: "girls top",
	price: "29.00",
	cat: "girls/tops"},
	{prodid: "7002",
	title: "Girls Top 7002",
	desc: "girls top",
	price: "35.00",
	cat: "girls/tops"},
	{prodid: "7003",
	title: "Girls Top 7003",
	desc: "girls top",
	price: "33.00",
	cat: "girls/tops"},
	{prodid: "7004",
	title: "Girls Top 7004",
	desc: "girls top",
	price: "46.00",
	cat: "girls/tops"},
	{prodid: "7005",
	title: "Girls Top 7005",
	desc: "girls top",
	price: "51.00",
	cat: "girls/tops"},
	//Girls Pants
	{prodid: "8000",
	title: "Girls Pant 8000",
	desc: "girls pant",
	price: "35.00",
	cat: "girls/pants"},
	{prodid: "8001",
	title: "Girls Pant 8001",
	desc: "girls pant",
	price: "50.00",
	cat: "girls/pants"},
	{prodid: "8002",
	title: "Girls Pant 8002",
	desc: "girls pant",
	price: "32.00",
	cat: "girls/pants"},
	{prodid: "8003",
	title: "Girls Pant 8003",
	desc: "girls pant",
	price: "27.00",
	cat: "girls/pants"},
	{prodid: "8004",
	title: "Girls Pant 8004",
	desc: "girls pant",
	price: "31.00",
	cat: "girls/pants"},
	{prodid: "8005",
	title: "Girls Pant 8005",
	desc: "girls pant",
	price: "44.00",
	cat: "girls/pants"}
];
products.men = products.all.slice(0, 12);
products.women = products.all.slice(12, 24);
products.boys = products.all.slice(24, 36);
products.girls = products.all.slice(36, 48);
products.men.pants = products.all.slice(0, 6);
products.men.shirts = products.all.slice(6, 12);
products.women.skirts = products.all.slice(12, 18);
products.women.tops = products.all.slice(18, 24);
products.boys.shirts = products.all.slice(24, 30);
products.boys.pants = products.all.slice(30, 36);
products.girls.tops = products.all.slice(36, 42);
products.girls.pants = products.all.slice(42, 48);
products.men.catid=1;
products.men.pants.catid="1000";
products.men.shirts.catid="2000";
products.women.catid="2";
products.women.skirts.catid="3000";
products.women.tops.catid="4000";
products.boys.catid="3";
products.boys.shirts.catid="5000";
products.boys.pants.catid="6000";
products.girls.catid="4";
products.girls.tops.catid="7000";
products.girls.pants.catid="8000";

function assignCatIds(cat){
	for(var i=0;i<cat.length;i++){
		cat[i].catid = cat.catid;
	}
}
assignCatIds(products.men.pants);
assignCatIds(products.men.shirts);
assignCatIds(products.women.skirts);
assignCatIds(products.women.tops);
products.find = function(prodid)
{
	var ret;
	for(var i = 0; i < products.all.length; i++)
	{
		if(products.all[i].prodid===prodid)
		{
			ret = products.all[i];
			break;
		}
	}
	return ret;
}
products.getCategory = function(catid){
	if(!catid) return;
	if(catid==products.men.catid)return products.men;
	if(catid==products.women.catid) return products.women;
	if(catid==products.boys.catid)return products.boys;
	if(catid==products.girls.catid) return products.girls;
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
	var r = recurseCategory(catid, products.men);
	if(r) return r; else r = recurseCategory(catid, products.women);
	if(r) return r; else r = recurseCategory(catid, products.boys);
	if(r) return r; else return recurseCategory(catid, products.girls);
	
}
