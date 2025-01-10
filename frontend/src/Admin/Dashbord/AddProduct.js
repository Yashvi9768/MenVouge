import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig.js';
import './AddProduct.css';

const AddProductPage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        brand: ''
    });

    const [productAddedMessage, setProductAddedMessage] = useState('');
    
    const db = getFirestore(app);
    const navigate = useNavigate(); // For navigation

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        // Add new product to Firestore
        try {
            await addDoc(collection(db, 'products'), {
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                image: newProduct.image,
                category: newProduct.category,
                brand: newProduct.brand
            });

            // Show the product added message
            setProductAddedMessage('Product is added.');

            // Clear the form inputs after successful addition
            setNewProduct({
                name: '',
                price: '',
                image: '',
                category: '',
                brand: ''
            });

            // Redirect back to the main page
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
        <div className="add-product-page">
            <form onSubmit={handleAddProduct}>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={newProduct.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={newProduct.brand}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>

            {/* Display a confirmation message when a product is added */}
            {productAddedMessage && (
                <p className="confirmation-message">{productAddedMessage}</p>
            )}
        </div>
        </div>
    );
};

export default AddProductPage;
