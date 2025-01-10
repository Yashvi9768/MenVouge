import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';

export const ShopContext = createContext(null);

// Custom hook to use ShopContext
const useShopContext = () => useContext(ShopContext);

// Function to fetch products from Firestore
const fetchProducts = async () => {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return productsList;
};

const ShopContextProvider = ({ children }) => {
    const [allProduct, setAllProduct] = useState([]);

    useEffect(() => {
        // Fetch all products from Firestore when the component mounts
        const loadProducts = async () => {
            const products = await fetchProducts();
            setAllProduct(products);
        };
        loadProducts();
    }, []);

    const [allProductCart, setAllProductCart] = useState({});

    // Function to add a product to the cart
    const addToCart = (itemId) => {
        setAllProductCart((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    // Function to remove a product from the cart
    const removeFromCart = (itemId) => {
        setAllProductCart((prev) => {
            const newCart = { ...prev };
            newCart[itemId] = Math.max(0, (prev[itemId] || 0) - 1);
            if (newCart[itemId] === 0) delete newCart[itemId];
            return newCart;
        });
    };

    // Function to calculate the total price of products in the cart
    const getCartTotal = () => {
        let total = 0;
        for (const itemId in allProductCart) {
            const product = allProduct.find((p) => p.id === itemId);
            if (product) total += product.price * allProductCart[itemId];
        }
        return total;
    };

    // Provide the context value
    const contextValue = {
        allProduct,
        allProductCart,
        addToCart,
        removeFromCart,
        getCartTotal,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

// Export the custom hook
export { useShopContext };

// Export the provider as default
export default ShopContextProvider;
