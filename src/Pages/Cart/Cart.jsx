import React from 'react';
import { CartContext } from '../../CartContext';
import { useContext } from 'react';


const Cart = () => {

  const { cart, moveToBin, updateTheShoppingList } = useContext(CartContext);

  const toBePaid = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
     <h1>Your Cart</h1>

     {cart.length === 0 ? (
      <p>Your cart is empty.</p> 
     ) : (
       <div>
        {cart.map((item) => (
          <div key={item.id} style={{ marginBottom: "1rem", border: "1px solid #ddd", padding: "1rem" }}>
          <h3>{item.name}</h3>
          <img src={item.imageUrl} alt={item.name} style={{ width: "100px" }} />
          <p>Price: ${item.price}</p>
          <p>Quantity:
            <input
              type='number'
              value={item.quantity}
              min='1'
              max='10'
              onChange={(e) => 
                updateTheShoppingList(item.id, parseInt(e.target.value, 10))
              } />
          </p>
          <button onClick={() => moveToBin(item.id)}>Remove</button>
          </div>
        ))}

        <h2>Total Price: ${toBePaid}</h2>
       </div>
     
     )}

    </div>
  
  );
};

export default Cart;

//<button onClick={() => updateTheShoppingList(item.id, item.quantity + 1)}>+</button>
//<button onClick={() => updateTheShoppingList(item.id, item.quantity - 1)}>-</button>
//<button onClick={() => moveToBin(item.id)}>Remove</button>
