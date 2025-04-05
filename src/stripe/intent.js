const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const stripe = Stripe('sk_test_51R3fhbPconqYmSJtkjWI2C4w66EmubT3yU9RTLr7KqhJzxCocfNdPkRpU6mZMWC3fMEWHpYA81VZaOm0fpVgZjg600n4pVVZud'); // Use your actual Stripe secret key
const app = express();

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
    const { planId, name, price } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name,
                        },
                        unit_amount: price * 100, // Stripe works with cents
                    },
                    quantity: 1,
                },
            ],
            metadata: { planId },
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log('Server running on port 4242'));
