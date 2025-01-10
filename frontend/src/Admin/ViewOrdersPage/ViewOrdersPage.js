import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig.js'; // Import your Firebase config file
import './ViewOrdersPage.css'; // Import your CSS file

const ViewOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        // Function to fetch orders from the 'orders' collection
        const fetchOrders = async () => {
            try {
                // Fetch data from the 'orders' collection in Firestore
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                // Map the data to an array of order objects
                const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Set the fetched order data in the state
                setOrders(ordersList);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        // Fetch orders data on component mount
        fetchOrders();
    }, [db]);

    return (
        <div className="view-orders-page">
            <h2>All Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list">
                {orders.map((order) => {
    console.log('Order:', order);
    console.log('Shipping Details:', order.shippingDetails);

    return (
        <li key={order.id} className="order-item">
            <div>
                <strong>Order ID:</strong> {order.id}
            </div>

            {/* Display cart items */}
            <div>
                <strong>Cart Items:</strong>
                <ul>
                    {order.cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} (Quantity: {item.quantity}) - ₹{item.price}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Display shipping details */}
            <div>
                <strong>Shipping Details:</strong>
                <p>Name: {order.shippingDetails && order.shippingDetails.name}</p>
                <p>Address: {order.shippingDetails && order.shippingDetails.address}</p>
                <p>City: {order.shippingDetails && order.shippingDetails.city}</p>
                <p>State: {order.shippingDetails && order.shippingDetails.state}</p>
                <p>Zip: {order.shippingDetails && order.shippingDetails.zip}</p>
                <p>Country: {order.shippingDetails && order.shippingDetails.country}</p>
            </div>
        </li>
    );
})}

                </ul>
            )}
        </div>
    );
};

export default ViewOrdersPage;
