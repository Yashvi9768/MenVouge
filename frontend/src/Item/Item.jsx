import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { useShopContext } from '../Context/ShopContext.jsx';
import { toast } from 'react-toastify';

const Item = (props) => {
    const { addToCart } = useShopContext();

    const handleAddToCart = () => {
        addToCart(props.id);
        toast.success(`${props.name} has been added to your cart!`);
    };

    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}>
                <img src={props.image} alt={props.name} />
            </Link>
            <p>{props.name}</p>
            <div className='item-details'>
                <div className='item-price'>
                    ₹{props.price}
                </div>
                <div className='btn'>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Item;
