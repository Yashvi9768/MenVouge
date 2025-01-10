import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./navbar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart/Cart.jsx";
import Home from "./pages/Home.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Brands from './pages/Brands/Brands.jsx';
import BrandProductsPage from './pages/Brands/BrandsProduct.js';
import './index.css';
import Footer from './Footer/Footer.jsx';
import Gym from './pages/Gym/Gym.jsx';
import Categories from './pages/Category/Category.jsx';
import Product from './pages/Product.jsx';
import ShopContextProvider from './Context/ShopContext.jsx';
import Login from './pages/Login.jsx';
import AdminLogin from './Admin/AdminLogin/AdminLogin.js';
import AdminDashboard from './Admin/Dashbord/Dashbord.js';
import ProductsView from './Admin/Dashbord/ProductsView.js';
import AddProductPage from './Admin/Dashbord/AddProduct.js';
import UserDetailsPage from './Admin/UserDetails/UserDetailsPage.js';
import ViewOrdersPage from './Admin/ViewOrdersPage/ViewOrdersPage.js';
import About from './Footer/AboutUs.js';
import ContactUs from './Footer/Contact.js';
import AllProduct from './Footer/AllProductPage.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import SuccessPage from './pages/success/success.jsx';

function App() {
    return (
        <BrowserRouter>
            <ShopContextProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <Routes>
                    {/* Routes with Navbar and Footer */}
                    <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
                    <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
                    <Route path="/categories" element={<><Navbar /><Categories /><Footer /></>} />
                    <Route path="/categories/skincare" element={<><Navbar /><Categories category="skincare" /><Footer /></>} />
                    <Route path="/categories/perfume" element={<><Navbar /><Categories category="perfume" /><Footer /></>} />
                    <Route path="/categories/haircare" element={<><Navbar /><Categories category="haircare" /><Footer /></>} />
                    <Route path="/categories/shaving" element={<><Navbar /><Categories category="shaving" /><Footer /></>} />
                    <Route path="/categories/beardcare" element={<><Navbar /><Categories category="beardcare" /><Footer /></>} />
                    <Route path="/categories/kits&combo" element={<><Navbar /><Categories category="kits&combo" /><Footer /></>} />
                    <Route path="/brands" element={<><Navbar /><Brands /><Footer /></>} />
                    <Route path="/brands/:brand" element={<><Navbar /><BrandProductsPage /><Footer /></>} />
                    <Route path="/gym" element={<><Navbar /><Gym /><Footer /></>} />
                    <Route path="/product" element={<><Navbar /><Product /><Footer /></>} />
                    <Route path="/product/:productId" element={<><Navbar /><Product /><Footer /></>} />
                    <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
                    <Route path="/signup" element={<><Navbar /><LoginSignup /><Footer /></>} />
                    <Route path="/signup/login" element={<><Navbar /><Login /><Footer /></>} />
                    <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
                    <Route path="/contact" element={<><Navbar /><ContactUs /><Footer /></>} />
                    <Route path="/allproduct" element={<><Navbar /><AllProduct /><Footer /></>} />
                    <Route path="/success" element={<SuccessPage />}/>
                    {/* Admin routes without Navbar and Footer */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/products" element={<ProductsView />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/users" element={<UserDetailsPage />} />
                    <Route path="/orders" element={<ViewOrdersPage />} />
                </Routes>
            </ShopContextProvider>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
