import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../Firebase/FirebaseConfig';
import './LoginSignup.css';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig';

const LoginSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Initialize Firestore
  const db = getFirestore(app);

  const handleSignup = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After successful signup, create a user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name,
        email,
        role: 'user', // Set user role to 'user' by default
        creationDate: new Date().toISOString()
      });

      console.log('User signed up and document created in Firestore');
      // Redirect to user dashboard or another page
      // Example: navigate('/dashboard');
    } catch (error) {
      // Handle signup error
      setError(error.message);
      alert(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div className='loginsignup' autoComplete="off">
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        {error && <div className="error-message">{error}</div>}
        <div className='loginsignup-fields'>
          <input
            type="text"
            placeholder='Your name'
            aria-label='name'
            autoComplete="new-password" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder='Email address'
            value={email}
            aria-label='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignup}>Continue</button>
        <p className='loginsignup-login'>
          Already have an account? <Link to={'/signup/login'}><span>Login here</span></Link>
        </p>
        <p className='admin-login-link'>
          Are you an admin? <Link to={'/admin/login'}>Login as Admin</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
