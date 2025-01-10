import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig.js';
import './ProductsView.css';
import { Link } from 'react-router-dom'; 

const ProductsView = () => {
    const [products, setProducts] = useState([]);

    const db = getFirestore(app);

    useEffect(() => {
        // Fetch product data from Firestore
        const fetchProducts = async () => {
            try {
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [db]);

    const handleDeleteProduct = async (productId) => {
        // Delete the product from Firestore
        try {
            await deleteDoc(doc(db, 'products', productId));
            
            // Update the list of products after deletion
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="products-view">
            <h2>All Products</h2>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>₹{product.price}</td>
                            <td>
                                <img src={product.image} alt={product.name} className="product-image" />
                            </td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                {/* Add "Delete" button */}
                                <button
                                    className="delete-product-button"
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/add-product'}>
                <button className="add-product-button">Add Product</button>
            </Link>
        </div>
    );
};

export default ProductsView;
