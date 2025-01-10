import React from 'react';
import './Cart.css';
import CartItems from '../../CartItems/CartItems';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Cart = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
            <CartItems />
            </Elements>
        </div>
    );
};

export default Cart;
