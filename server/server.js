import express from 'express';
import stripePackage from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// CORS middleware setup
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Define the /api/checkout endpoint
app.post('/api/checkout', async (req, res) => {
    try {
        const { cartItems, shippingDetails } = req.body;

        // Calculate total amount for the checkout session
        const amount = cartItems.reduce((total, item) => total + item.price * 100 * item.quantity, 0);

        // Create a Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'INR', // Change currency if needed
                    product_data: { name: item.name },
                    unit_amount: item.price * 100, // Price in cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cart',
        });

        // Send the session URL to the client
        res.json({ sessionUrl: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
