import React, { useState } from 'react';
import { useShopContext } from '../Context/ShopContext.jsx';
import './CartItems.css';
import crossIcon from '../Admin/Dashbord/assets/gym/cart_cross_icon.png';
import { db } from '../Firebase/FirebaseConfig.js'; 
import { collection, addDoc } from 'firebase/firestore'; 
import axios from 'axios';

const CartItems = () => {
    const { allProductCart, removeFromCart, addToCart, getCartTotal, allProduct } = useShopContext();

    // State to store shipping details
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    // Handle changes in the shipping details form
    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Calculate the total price of products in the cart
    const cartTotal = getCartTotal();

    // Retrieve product data for each item in the cart
    const cartItemsData = Object.entries(allProductCart).map(([itemId, quantity]) => {
        const product = allProduct.find(p => p.id === itemId);
        return { ...product, quantity };
    });

    // Handle incrementing quantity of an item in the cart
    const handleIncrementQuantity = (itemId) => {
        addToCart(itemId);
    };

    // Handle decrementing quantity of an item in the cart
    const handleDecrementQuantity = (itemId) => {
        removeFromCart(itemId);
    };

    // Save order details to Firestore
    const saveOrderToFirestore = async (cartItemsData, shippingDetails) => {
        try {
            // Create a reference to the "orders" collection
            const ordersRef = collection(db, 'orders');

            // Add a new document to the "orders" collection with the order data
            const orderDocRef = await addDoc(ordersRef, {
                cartItems: cartItemsData,
                shippingDetails: shippingDetails,
                orderDate: new Date(),
            });

            console.log('Order saved with ID:', orderDocRef.id);
        } catch (error) {
            console.error('Error saving order to Firestore:', error);
        }
    };

// Define the handleCheckout function
const handleCheckout = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/checkout', {
            cartItems: cartItemsData,
            shippingDetails: shippingDetails,
        });

        // Redirect the user to the returned session URL
        window.location.href = response.data.sessionUrl;

        // After successful payment, Stripe redirects to the success URL you set
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};


    return (
        <div className="cartitems">
            {cartItemsData.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <>
                    {/* Header for cart items */}
                    <div className="cartitems-main">
                        <p>Products</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <hr />
                    {/* Render each cart item */}
                    {cartItemsData && cartItemsData.map((item) => (
                        <div key={item.id}>
                            <div className="cartitem-format cartitems-main">
                                <img src={item.image} alt="" />
                                <p>{item.name}</p>
                                <p>₹{item.price}</p>
                                <div className="cartitem-quantity">
                                    <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
                                </div>
                                <p>₹{item.price * item.quantity}</p>
                                <img src={crossIcon} className="remove-icon" onClick={() => removeFromCart(item.id)} alt="Remove" />
                            </div>
                            <hr />
                        </div>
                    ))}
                    {/* Shipping form */}
                    <div className="shipping-form">
                        <h3>Shipping Details</h3>
                        <form onChange={handleShippingChange}>
                            <input type="text" name="name" placeholder="Name" required />
                            <input type="text" name="address" placeholder="Address" required />
                            <input type="text" name="city" placeholder="City" required />
                            <input type="text" name="state" placeholder="State" required />
                            <input type="text" name="zip" placeholder="Zip Code" required />
                            <input type="text" name="country" placeholder="Country" required />
                        </form>
                    </div>
                    {/* Cart total section */}
                    <div className="cart-total">
                        <h3>Cart Total</h3>
                         <div className="total-row">
                            <p>Total:</p>
                            <p>₹{cartTotal.toFixed(2)}</p>
                    </div>
                    <div className="total-breakdown">
                        <p><span>Delivery Charges:</span> <span>Free</span></p>
                    </div>
    <button  className="proceed-to-checkout" onClick={handleCheckout}>
        Proceed to Checkout
    </button>
</div>
                </>
            )}
        </div>
    );
};

export default CartItems;