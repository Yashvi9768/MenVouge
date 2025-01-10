import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./style.css";
import c_img from "./pages/images.png";
import { Link, useNavigate } from "react-router-dom";
import img from "./logo.png";
import { ShopContext } from "./Context/ShopContext.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const { allProductCart, gymProductCart, dataProductCart } = useContext(ShopContext);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [menu, setMenu] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    let totalCartItems = Object.values(allProductCart).reduce((sum, quantity) => sum + quantity, 0);
    setCartItemsCount(totalCartItems);

    // Check the current user's authentication state
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.displayName || currentUser.email);
      } else {
        setUser(null);
      }
    });
  }, [allProductCart, auth]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div>
        <img src={img} alt="" style={{ width: "200px", height: "80px" }} />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("home")}>
          <Link style={{ textDecoration: "none" }} to="/">
            HOME
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("categories")}>
          <Link style={{ textDecoration: "none" }} to="/categories">
            CATEGORIES
          </Link>
          {menu === "categories" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("brands")}>
          <Link style={{ textDecoration: "none" }} to="/brands">
            BRANDS
          </Link>
          {menu === "brands" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("gym")}>
          <Link style={{ textDecoration: "none" }} to="/gym">
            GYM
          </Link>
          {menu === "gym" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {user ? (
          <div>
            <span>Welcome!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/signup">
            <button>Login</button>
          </Link>
        )}
      </div>
      <Link to="/cart">
        <div className="cart-icon-container">
          <img src={c_img} alt="" style={{ width: "40px" }} />
          <div className="nav-cart-count">{cartItemsCount}</div>
        </div>
      </Link>
    </nav>
  );
}