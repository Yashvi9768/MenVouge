import React from 'react';
import './ProductDisplay.css';
import star from '../Admin/Dashbord/assets/star_icon.png';
import star_dull from '../Admin/Dashbord/assets/star_dull_icon.png';
import { useShopContext } from '../Context/ShopContext.jsx';
import { toast } from 'react-toastify';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useShopContext();

    // Add the product to the cart and show toast notification
    const handleAddToCart = () => {
        addToCart(product.id);
        toast.success(`${product.name} has been added to your cart!`);
    };

    return (
        <div className="pro-display">
            <div className="productdisplay-left">
                <div className="img">
                    <img src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="dis-star">
                    {/* Dynamic star rating based on product.rating */}
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <img
                            key={starIndex}
                            src={starIndex <= product.rating ? star : star_dull}
                            alt="star"
                        />
                    ))}
                    <p>({product.ratingCount || 0})</p>
                </div>
                <div className="dis-right">
                    <div className="right-price">₹{product.price}</div>
                </div>
                <div className="right-description">{product.description || 'No description available.'}</div>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDisplay;
