
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Pages/Home/Home';
import Product from './Pages/AboutProduct/AboutProduct';
import Cart from './Pages/Cart/Cart';
import Navbar from './Navbar';
import { CartProvider } from './CartContext';
import './App.scss'

const App = () => {
 return (
  <CartProvider>
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  </BrowserRouter>
  </CartProvider>
 )
}

export default App;

//Home Page displayes the product grid and featured products.
//Product page shows details for a specific product
//:id is a URL parameter(for ex. /product/123)
//Cart Page displays the list of products added to the cart.

/* <Route> component is used to define which component should be rendered 
based on the current URL path. This is the "routing logic" of the app 

wrapping App.jsx with CartProvider ensures the entire app can access the 
cart "food" without worrying about how it is prepared
 */



