import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../Firebase/FirebaseConfig.js';
import Item from '../Item/Item.jsx';
import './AllProductPage.css'

const AllProductPage = () => {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    // Fetch product data from Firestore
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [db]);

  return (
    <div className='all-product'>
      <h1>All Products</h1>
      <div className='product-list'>
        {products.map(product => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductPage;