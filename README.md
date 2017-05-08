# Bamazon

When program is initiated - user is greeted to Bamazon.  
A list of all the inventory, prices and stock availability is sent to the screen. The inventory has been populated through our MySQL database which was populated from my local CSV file. 

![initial inventory list](https://cloud.githubusercontent.com/assets/22968949/25807340/7e50bdfa-33d4-11e7-84cb-0f9c377ffa61.gif)

After all the inventory list is posted to the screen - the user is prompted to select and item ID # to purchase and the quantity.
If there is enough inventory, the user is given a recap of the order and the final amount due. They are then prompted to select another item.

After the user enters in their selection, the inventory in our database is updated. 
![inventory final](https://cloud.githubusercontent.com/assets/22968949/25807476/f4823878-33d4-11e7-9ec2-9905bd694cc6.gif)

If there is not sufficient inventory, the user is notified and prompted to make a new selection.






