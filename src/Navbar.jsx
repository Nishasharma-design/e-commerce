import React from 'react'
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div>
      <nav>
      <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
      </nav>
    </div>
  );
}

export default Navbar;

//*NavBar basically creates clickable navigation that allows users to navigate 
//between different parts of the app. */
//*<Link to="/">Home</Link> creates a link that will navigate the user to the 
//Home Page
// <Link> must have a "to" attribute to tell React Router where to navigate
// without it, the link is just regular text and wont do anything 
// Basically <Link> does not causes refresh
// with to="/" as the attribute, the URL changes to / and react router renders the 
// home page  */
