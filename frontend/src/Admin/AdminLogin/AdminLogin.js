import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig.js'; // Import your Firebase config file

// Initialize Firestore
const db = getFirestore(app);

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from submitting traditionally

        try {
            // Get Firebase Authentication instance
            const auth = getAuth();

            // Sign in user with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch the user's role from Firestore
            const userRole = await fetchUserRole(user.uid);

            if (userRole === 'admin') {
                // User is an admin, redirect to admin dashboard
                navigate('/admin/dashboard');
            } else {
                // User is not an admin, deny access
                setError('You do not have admin access.');
            }
        } catch (error) {
            setError(`Login error: ${error.message}`);
        }
    };

    // Function to fetch the user's role from Firestore
    async function fetchUserRole(uid) {
        try {
            // Reference the user's document in the 'users' collection
            const userRef = doc(db, 'users', uid);

            // Fetch the document
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Return the user's role from the document
                return userDoc.data().role;
            } else {
                // If the document does not exist, log an error and return null
                console.error('User document does not exist');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            return null;
        }
    }

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
