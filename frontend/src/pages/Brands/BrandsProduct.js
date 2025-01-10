import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig.js';
import Item from '../../Item/Item.jsx'; 
import './BrandsPrduct.css';

const BrandProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { brand } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore(app);
        const productsCollection = collection(db, 'products');
        const productsQuery = query(productsCollection, where('brand', '==', brand));
        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (brand) {
      fetchProducts();
    }
  }, [brand]);

  return (
    <div>
      <h2>Products by {brand}</h2>
      <div className="product-grid">
  {products.length > 0 ? (
    products.map((product) => (
      <Item
        key={product.id}
        className="product-item"
        id={product.id}
        image={product.image}
        name={product.name}
        price={product.price}
      />
    ))
  ) : (
    <p>No products found for this brand.</p>
  )}
</div>

    </div>
  );
};

export default BrandProductsPage;