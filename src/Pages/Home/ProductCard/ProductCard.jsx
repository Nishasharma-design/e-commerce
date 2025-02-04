import React from 'react'
import { Link } from 'react-router';
import classes from './ProductCard.module.scss';

const ProductCard = ({ product }) => {
  return (
    <div className={classes.card}>
      <img src={product.imageUrl} alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>
       <button className={classes.button}>View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;

//Home.jsx uses ProductCard as his child component
//ProductCard represents a single product 

//*<Link> is like an anchor <a> tag in regular HTML
// the to={`/product/${product.id}`} is used to specify the URL that the link will navigate to
// this means when a user clicks the button, they will be taken to a product detail page
// where the url will look something like /product/autoId
// and this autoId is what Firebase assigned when i created when creating product collection  */ 

