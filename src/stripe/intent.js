import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe('pk_test_51R3fhbPconqYmSJtUhSPMTRDpObA87eZh906O9EqIwl0Kk4EvHNJHOY65QIuTFF2Y8Yxq4e48PVaoqVsevE143qE00hD6vgP1A');

const handlePurchase = async (planId, price) => {
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId, price }),
  });
  const { clientSecret } = await response.json();

  // Redirect to Stripe Checkout
  const { error } = await stripe.confirmPayment({
    clientSecret,
    payment_method: { card: elements.getElement(CardElement) },
  });

  if (error) {
    console.error('Payment failed:', error.message);
  } else {
    console.log('Payment successful!');
    // Save purchase record in Firestore
    await savePurchase(planId);
  }
};