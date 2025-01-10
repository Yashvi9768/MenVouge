import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig.js';
import './Dashbord.css';
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);

        // Fetch products data
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);

        // Fetch orders data
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [db]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="sections-container">
      <div className="products-section">
  <div className="section-title">Products</div>
  <Link to="/products" className="section-link">View All Products</Link>
</div>

<div className="users-section">
  <div className="section-title">Users</div>
  <Link to="/users" className="section-link">View All Users</Link>
</div>

<div className="orders-section">
  <div className="section-title">Orders</div>
  <Link to="/orders" className="section-link">View All Orders</Link>
</div>
      </div>
    </div>
  );
};

export default AdminDashboard;