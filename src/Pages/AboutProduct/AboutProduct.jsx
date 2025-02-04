import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { CartContext } from '../../CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firestore'; //imports firebase instance db

const AboutProduct = () => {
   const { id } = useParams(); //Extract the "id" from the URL, which means it gets the product ID from url
   const [product, setProduct] = useState();
   const [loading, setLoading] = useState(true);
   const { addToShoppingList } = useContext(CartContext);

   //fetchProduct is an async fxn used for retrieving product details from firestore.

   useEffect(() => {
    const fetchProduct = async () => {
      try {
        const aboutDoc = doc(db, "Products", id); //this line does'nt fetch data yet, it simply creates a ref to the document.
        const fetchedDoc = await getDoc(aboutDoc); //fetches the product's data from Firestore.

        if (fetchedDoc.exists()) {
         setProduct({ id: fetchedDoc.id, ...fetchedDoc.data() });
        } else {
         console.log("No such product");
        }
       } catch (error) {
         console.error("Error") //console.error logs the error details to the browser console.
       } finally {
         setLoading(false);
       }
    };
    fetchProduct();
   }, [id]);

   return (
      <div>
         {loading ? (
            <p>Loading...</p>
         ) : (
            product && (
               <div>
                  <img src={product.imageUrl} alt={product.name} 
                  style={{
                     width: "300px",
                     height: "auto",
                     borderRadius: "10px",
                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                     marginBottom: "15px"
                   }} 
                  />
                  <h2>{product.name}</h2>
                  {product.variants && (
                  <p>Variants: {Array.isArray(product.variants) ? product.variants.join(", ") : "No variants available"}</p>
                    )}
                  <p>Price: ${product.price}</p>
                  <button onClick={() => addToShoppingList(product)}>Add to Cart</button>
                  </div>
            )
         )}
      </div>
   );
  
};

export default AboutProduct;

//AboutProduct is responsible for displaying the details of a single product.
//doc is a fxn(from FS) that creates a reference to a specific document in FS DB.

//useParams() is a React Router hook, allows to access dynamic parameters from URL.
//{ id } gets the product ID from URL

////In Firebase Firestore, the "doc" function is a method used to access a specific document within a collection, 
///allowing you to retrieve or modify data from that particular document by providing its unique document ID; 
//essentially, it acts as a reference to a single document within your database.

//id is the ID of the specific product to fetch(retrieved from URL via useParams).
//getDoc is used fetch a single document from firestore.

//fetchedDoc.id - unique ID of the document in FS
//fetchedDoc.data() - an object containing all the fields in the document(e.g. name, price, etc)
//{...fetchedDoc.data() } part is a spread operator that spreads all fields of the document into the new object.

//we are using useEffect to fetch, and it will render everytime the id of the document changes





