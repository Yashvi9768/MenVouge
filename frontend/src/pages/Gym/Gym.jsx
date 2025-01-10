import React, { useEffect, useState } from 'react';
import './Gym.css';
import Item from '../../Item/Item';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/FirebaseConfig.js';

const Gym = () => {
    const [gymProducts, setGymProducts] = useState([]); // State to store gym products

    useEffect(() => {
        // Function to fetch gym products from Firestore
        const fetchGymProducts = async () => {
            try {
                // Reference the 'products' collection
                const productsCollection = collection(db, 'products');
                
                // Create a query to filter products by category 'gym'
                const gymQuery = query(productsCollection, where('category', '==', 'gym'));
                
                // Fetch documents from the query
                const querySnapshot = await getDocs(gymQuery);
                
                // Map documents to an array of products
                const gymProductList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                // Update state with fetched gym products
                setGymProducts(gymProductList);
            } catch (error) {
                console.error('Error fetching gym products:', error);
            }
        };

        fetchGymProducts(); // Call the fetch function when component mounts
    }, []); // Dependency array is empty, so it runs once on mount

    return (
        <div className='gym'>
            {/* Header and horizontal line */}
            <h2 className='gym-header'>Gym Products</h2>
            <hr className='gym-divider' />
            
            {/* Product grid */}
            <div className='item-img'>
                {gymProducts.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default Gym;
