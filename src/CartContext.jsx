import { createContext, useState } from "react";


export const CartContext = createContext(); //createContext creates the CartContext to share across any components

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); //state to store cart items
    
    const addToShoppingList = (product) => {
       const alreadyInTheList = cart.find((item) => item.id === product.id); //checks if the product is already in the cart using .find()

       if (alreadyInTheList) {
      //first it checks if the product is already in the cart, if yes, then 
     //it increases the quantity        
          const newQty = alreadyInTheList.quantity + 1;
          if (newQty > product.quantity) return; //this ensures the qty does'nt exceed the available stock, if it
          //does, it stops execution

          setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: newQty } : //spreads the existing item data and updates only the qty
          item) //loops thru each cart item, if the id matches the product's id, it updates the qty
// else it keeps the item as it is. 
           );
       } else {
        setCart([...cart, { ...product, quantity: 1 }]); //if product doesn't exist, add it as a new product with qty 1 or product.quantity
       }
    };

    const moveToBin = (id) => {
        setCart(cart.filter((item) => item.id !== id)); //remove the product from the cart
    };
    // .map() loops through every item in the cart, checks if the current item is the one
    //we want to update, if yes - creates a new object with all the item properties but updates qty, else keep the item unchanged
    const updateTheShoppingList = (id, quantity) => {
       setCart(cart.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
    };

    return (
        <CartContext.Provider value={{ cart, addToShoppingList, moveToBin, updateTheShoppingList }}> 
            {children}
        </CartContext.Provider>
    );

};

//* This is where I am managing the shopping cart's data and functionality 
// it does three main things:- 1. Creates a context so that any component in the app
// can access the cart data without passing the props manually
// 2. Stores the cart data:- keeps track of the items added to the cart.
// 3. Provides functions:- Adds, removes and updates items in the cart.
//  */

/* This is a special wrapper component that will store and provide the cart
data to all the components.
{ children } means whatever is inside <CartProvider> in App.jsx will be 
 wrapped inside it.
  */ 

 /* cart holds the list of items added to cart
 and setCart functions updates the cart whenever an item is added, removed or modified.
 useState initializes the cart as an empty array.

 alreadyInTheList stores an item with the same id as the product being added
 alreadyInTheList.quantity is the current quantity of the product in the cart

 **newQty stores the total quantity after adding

 CartContext :- creates the "box" to store cart data - just an empty container
 CartProvider:- fills the box with cart data and fxns - can be thought like a chef who fills the plate with food
 CartContext.Provider:- distributes the box to the app

 CartContext = createContext(); creates an empty context
 CartProvider fills the context with actual cart data and provides it to the app.

 */
