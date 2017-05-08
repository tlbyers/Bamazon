//Amazon like program - Table inside database called products 
//The products table includes following columns: 
//		item_id (unique id for each procuct)
//		product_name (Name of product)
//		department_name
//		price (cost to customer)
//		stock_quantity (how much of the product is available in stores)
//Populate the database with about 10 different products 
//Create Node application called bamazonCustomer.js
//		This application will display all of the items available for sale 
//			Include the ids, names, and prices for products 
//The app should prompt users with two messages 
//		They should ask them the ID of the product they would like to buy
//		They should ask how many units of the product they would like to buy 
//Once the customer has placed the order, your application should check if your 
//	store has enough of the product to meet the customer's request
//		If not, the app should log a phrase like "Insufficient quantity!"
//			then prevent it from going through
//		If the store has enough of the product, you should fulfill the order 
//			this means updating SQL database to reflect the remaining quantity
//			once the update goes through, show the customer the total cost of their purchase

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "productsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  storeOpening();
  
});
//function to announce opening of store and items available for purchase
var storeOpening =function(){
	console.log("");
	console.log("Welcome to Bamazon!");
	console.log("Here is what we have for sale today:");
	console.log("--------------------------------------------------------------------------------------------")
	connection.query("SELECT * FROM bamazonProducts", function(err, res) {
  if (err) throw err;
  console.log(res);
  console.log("--------------------------------------------------------------------------------------------")
  productSearch();
});
};

//Function the displays inventory and allows users to request which items to purchase
var productSearch = function() {
// query the database for items being purchased
  connection.query("SELECT * FROM bamazonproducts", function(err, results) {
    if (err) throw err;
// first lists inventory then asks the user to choose an item
  inquirer.prompt([{
    name: "productID",
    type: "input",
    message: "Product ID you wish to purchase:",
	},{
	name: "quantity",
	type: "input",
    message: "How many do you wish to purchase:",  
	}]).then(function(answer) {
		var custOrder;
		var custQuant;    	

		custOrder=answer.productID;//Product ID chosen by user
		custQuant=parseInt(answer.quantity); //# of the procduct chosen by user


		//checks database to see if there are enough of the item in stock		
		connection.query("SELECT * FROM  productsdb.bamazonproducts WHERE product_ID = " + custOrder, function(err, results) {
		
    		if (err) throw err;
    		for(var i=0;i<results.length;i++){
    			 var totalCost=results[i].price * custQuant;
           var dollarTotalCost=totalCost.toFixed(2);
           
   				 if( (results[i].stock_quantity+1)>custQuant){
   				 	console.log("-----------------------------------------------------------------------------------")
   				 	console.log("Your order of "+ "'"+ custQuant + "'"+" " + "'"+results[i].product_name +"'"+ " "+ "totals: "+ "$"+ dollarTotalCost);
   				 	console.log("-----------------------------------------------------------------------------------")
   				 	var newStock=(results[i].stock_quantity-custQuant);

            
            connection.query("UPDATE bamazonproducts SET ? WHERE ?",[{
              stock_quantity:newStock},{
              product_ID:custOrder
              }],function(error){
                if(error) throw err;
              })           

            productSearch();
   				 }
   				 else{
   				 	console.log("Insufficient quantity");
   				 	console.log("------------------------------------------------------------------------------------");
   				 	productSearch();
   				 }
  			   }   	  		
		})		
    });
  });
 };

 