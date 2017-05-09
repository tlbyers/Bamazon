// Challenge #2: Manager View (Next Level)

// Create a new Node application called bamazonManager.js. Running this application will:
// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

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
	console.log("Welcome to the Bamazon Manager Site!");
	console.log("--------------------------------------------------------------------------------------------")

runSearch();
	
};

var runSearch = function() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }).then(function(answer){
  	switch (answer.action) {

      case "View Products for Sale":
        forSale();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        newProduct();
        break;
    }
  });
};

//function that shows the inventory 
var forSale=function(){
	console.log("");
	console.log("   Here is the inventory list: ")
	// query the database for items in inventory
	console.log("--------------------------------------------------------------------------------------------")
  	
  	connection.query("SELECT * FROM bamazonProducts", function(err, res) {
	  if (err) throw err;
	  console.log(res);
	  console.log("--------------------------------------------------------------------------------------------")
      
      //goes back to the menu function
	  runSearch();
	});
};

//function to show low inventory items
var lowInventory=function(){
		console.log("");
		console.log("The following items are low in inventory:")
		console.log("--------------------------------------------------------------------------------------------")
		 	//checks database to see if there are enough of the item in stock		
			connection.query("SELECT * FROM productsdb.bamazonproducts WHERE stock_quantity<5", function(err, results) {
		        if (err) throw err;
		  		console.log(results);  
		console.log("--------------------------------------------------------------------------------------------")  

		runSearch();
		})		
	};

var addInventory=function(){
	inquirer.prompt([{
	    name: "productID",
	    type: "input",
	    message: "Product ID you wish to increase inventory of:",
		},

		{
		name: "quantity",
		type: "input",
	    message: "How many do you wish to add:",  
		}]).then(function(answer) 

		{	
        var invOrder=answer.productID;
		var invQuant=parseInt(answer.quantity);

		//pulls inventory up and searches for user parameters - then adds chosen amount of inventory
		//entered by user into current stock quantity for product user chose

		connection.query("SELECT * FROM  productsdb.bamazonproducts WHERE product_ID = " + invOrder, function(err, results) {
			
			for(var i=0;i<results.length;i++){

				var newStock=invQuant + (results[i].stock_quantity);
 	

				invOrder=answer.productID;//Product ID chosen by user
				invQuant=parseInt(answer.quantity); //# of the procduct chosen by user

				console.log("--------------------------------------------------------------------------------------------")
				connection.query("UPDATE bamazonproducts SET ? WHERE ?",[{
				stock_quantity:newStock},{
				product_ID:invOrder
				}],function(error){
				if(error) throw err;
				}) 
				console.log("--------------------------------------------------------------------------------------------")          

				runSearch();
	  		};
		  });
  	    });
	};

//function for adding inventory
var newProduct=function(){
	console.log("what new product do you want to add? ")
	inquirer.prompt([{
	    name: "productID",
	    type: "input",
	    message: "Product ID you wish to add to stock:",
		},
		{
		name: "productName",
		type: "input",
	    message: "Name of the product you wish to add to stock:",  
		},
		{
		name: "deptName",
	    type: "input",
	    message: "Department you wish to add the product to:",
		},
		{
		name: "price",
	    type: "input",
	    message: "Price of the product:",
		},
		{
		name: "quantity",
		type: "input",
	    message: "How many do you wish to add:",  
		}]).then(function(answer) 

		{	

      	connection.query("INSERT INTO bamazonproducts SET ?", {
		  product_ID: answer.productID,
		  product_Name: answer.productName,
		  department_name: answer.deptName,
		  price:answer.price,
		  stock_quantity:answer.quantity

		}, function(err, res) {

		})           
		console.log(("--------------------------------------------------------------------------------------------"))		
				runSearch();

	  	});
	};
  	



