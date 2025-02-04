import { collection, getDocs } from 'firebase/firestore'; //gets the collection and getDocs() fetches all products
import { db } from '../../config/firestore';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard';
import classes from './Home.module.scss';

const Home = () => {
  
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 //For Carousel implementation
 const [featured, setFeatured] = useState([]);
 const [currentIndex, setCurrentIndex] = useState(0);


 useEffect(() => {
    const fetchProducts = async () => {
        try {
            const productList = await getDocs(collection(db, "Products")); //fetches all docs from the products collection
            const fetchedList = productList.docs.map((doc) => ({ //creating an object for each product
                id: doc.id,
                ...doc.data(), //converts firestore docs into an array of products
            }));
            setProducts(fetchedList); //this is telling Hey React, update products with fetchedList array

//featured array is filled with data when we fetch products from firestore
            setFeatured(fetchedList.filter((product) => product.favourited)); //filter the favourited products for the carousel 
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchProducts();
 }, []); //runs the fxn only once when the page loads

 if (loading) {
    return <p>Loading products...</p>;
 }

 //handling carousel implementation
 /* so, basically i do not want to run into something blank, so i am wrapping with the modulo,
 so when my list finishes, it restarts when click ">" */
 const nextItem = () => {
    setCurrentIndex((currentProduct) => (currentProduct + 1) % featured.length); //for eg, if we are on 10th product, we add 1 so that we return to 1st prod
 };

 const prevItem = () => {
    setCurrentIndex((currentProduct) => (currentProduct - 1 + featured.length) % featured.length);
 };

 return (
    <div className={classes.container}>
        <h1>Tech Essentials</h1>
         {/* Carousel implementation */}
         {featured.length > 0 && (
            <div className={classes.carousel_container}>
                <button onClick={prevItem} className={classes.slide_button}>{"<"}</button>
              <div className={classes.carousel}>
                <ProductCard product={featured[currentIndex]} />
              </div>
                <button onClick={nextItem} className={classes.slide_button}>{">"}</button>
                </div>
         )}
         {/* Displaying all the products on the Home Page, now 
               products has real data,  */ }
        <div className={classes.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
 );

};

export default Home;

//useEffect is a React Hook that performs side-effects in the components
//(like fetching data, updating DOM)
//2nd param -[], means this effect will only once when 
//the component first renders.

//collection(db, "products"): Refers to the products in my firestor database
//db is provided by firestore.js

//getDocs(collection(...)): Fetches all the documents in the products (from my FS-DB)
//productList contains all the documents and metadata returned by Firestore.

//product prop represents the details of a product that the user wants to add
//to the cart

//The reason setFeatured(fetchedList.filter((product) => product.favorited)); is 
// inside useEffect is because useEffect is the appropriate place for side effects like fetching data.
//  You want to fetch the products from Firestore and then set the featured products state after that

//**ABOUT CAROUSEL:-
// The reason we add featured.length when going to the previous slide is to avoid getting a negative number
//  when subtracting from prevIndex.
//  */

