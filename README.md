# Bamazon

When program is initiated - user is greeted to Bamazon.  
A list of all the inventory, prices and stock availability is sent to the screen. The inventory has been populated through our MySQL database which was populated from my local CSV file. 

![initial inventory list](https://cloud.githubusercontent.com/assets/22968949/25807340/7e50bdfa-33d4-11e7-84cb-0f9c377ffa61.gif)

After all the inventory list is posted to the screen - the user is prompted to select and item ID # to purchase and the quantity.
If there is enough inventory, the user is given a recap of the order and the final amount due. They are then prompted to select another item.

![purchase](https://cloud.githubusercontent.com/assets/22968949/25808453/25d3d6ea-33d8-11e7-9029-8b332b42221f.gif)

After the user enters in their selection, the inventory in our database is updated. 
![inventory final](https://cloud.githubusercontent.com/assets/22968949/25807476/f4823878-33d4-11e7-9ec2-9905bd694cc6.gif)

If there is not sufficient inventory, the user is notified and prompted to make a new selection.
![insufficient inventory](https://cloud.githubusercontent.com/assets/22968949/25808821/3129d6ce-33d9-11e7-8b0a-1572eff27590.gif

Manager Option:
Beginning inventory in MySql:
![manageropeninginventory](https://cloud.githubusercontent.com/assets/22968949/25832104/8105d9ec-3436-11e7-807c-8f1d686efc64.gif)

Manager is prompted to select what to do...option 1 - show the inventory of the store:

![option1](https://cloud.githubusercontent.com/assets/22968949/25832102/8104b59e-3436-11e7-842f-fc4a81007a39.gif)
![option1 b](https://cloud.githubusercontent.com/assets/22968949/25832101/8104a72a-3436-11e7-8161-ae048b023142.gif)

If manager selects option2 - a list of all products with less than 5 in the inventory list are reported
![option2](https://cloud.githubusercontent.com/assets/22968949/25832103/81053a8c-3436-11e7-8a69-5cd2fc55793f.gif)

If manager selects option 3, the number of a product can be increased in database
![option3](https://cloud.githubusercontent.com/assets/22968949/25832100/8102cec8-3436-11e7-99ed-0a02f63fb3ec.gif)

If manager selects option 4, an additional item can be added to the inventory
![option4](https://cloud.githubusercontent.com/assets/22968949/25832105/810b322a-3436-11e7-96e0-ea213083af5f.gif)

Final inventory shows the updated database - increased inventory and the additional item added
![finalinventory](https://cloud.githubusercontent.com/assets/22968949/25832099/810230f8-3436-11e7-9913-ed65e7b6ea8d.gif)







