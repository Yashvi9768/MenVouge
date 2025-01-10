import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig.js'; // Import Firestore database instance
import Breadcrum from '../Breadcrums/Breadcrum';
import ProductDisplay from '../ProductDisplay/ProductDisplay';

const Product = () => {
    const { productId } = useParams(); // Get productId from URL parameters
    const [product, setProduct] = useState(null); // State to store the product
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for errors

    useEffect(() => {
        // Fetch product data from Firestore based on productId
        const fetchProduct = async () => {
            try {
                // Reference the 'products' collection and create a query
                const productsCollection = collection(db, 'products');
                const productQuery = query(productsCollection, where('id', '==', productId));
                
                // Get the documents from the query
                const querySnapshot = await getDocs(productQuery);
                
                // If there is a matching document, set the product data
                if (!querySnapshot.empty) {
                    const docSnapshot = querySnapshot.docs[0];
                    setProduct({ id: docSnapshot.id, ...docSnapshot.data() });
                } else {
                    setError('Product not found.');
                }
            } catch (err) {
                setError('Failed to fetch product data.');
            } finally {
                setLoading(false);
            }
        };

        // Call the function to fetch product data
        fetchProduct();
    }, [productId]);

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error state if there was an error
    if (error) {
        return <div>{error}</div>;
    }

    // Render the product display
    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
        </div>
    );
};

export default Product;
