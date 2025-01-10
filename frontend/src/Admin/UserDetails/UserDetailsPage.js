import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig.js'; // Import your Firebase config file
import './UserDetailsPage.css'; // Import your CSS file

const UserDetailsPage = () => {
    const [users, setUsers] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch data from the 'users' collection in Firestore
                const usersSnapshot = await getDocs(collection(db, 'users'));
                // Map the data to an array of user objects
                const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Set the fetched user data in the state
                setUsers(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Call the function to fetch user data
        fetchUsers();
    }, [db]);

    return (
        <div className="user-details-page">
            <h2>All Users</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <span>User ID: {user.id}</span><br />
                            <span>Email: {user.email}</span><br />
                            <span>Role: {user.role}</span>
                            {/* Add more user details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserDetailsPage;
