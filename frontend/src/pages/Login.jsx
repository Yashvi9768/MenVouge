import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/FirebaseConfig';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login, e.g., redirect to dashboard
      navigate('/home'); // Example redirection to the home page
    } catch (error) {
      setError(error.message.split('/')[1].slice(0, -2));
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="loginsignup-fields">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p className="loginsignup-login">
          Don't have an account? <Link to="/signup"><span>Sign Up here</span></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
