<template>
  <div class="delivery-page">
    <h1>Delivery Details</h1>
    <p class="subtitle">Please fill in your delivery information before proceeding to payment.</p>

    <form @submit.prevent="proceedToPayment" class="delivery-form">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input v-model="deliveryDetails.name" type="text" id="name" placeholder="Enter your full name" required />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input v-model="deliveryDetails.email" type="email" id="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input v-model="deliveryDetails.address" type="text" id="address" placeholder="Enter your address" required />
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input v-model="deliveryDetails.city" type="text" id="city" placeholder="Enter your city" required />
      </div>

      <div class="form-group">
        <label for="postalCode">Postal Code</label>
        <input v-model="deliveryDetails.postalCode" type="text" id="postalCode" placeholder="Enter your postal code" required />
      </div>

      <div class="form-group">
        <label for="country">Country</label>
        <input v-model="deliveryDetails.country" type="text" id="country" placeholder="Enter your country" required />
      </div>

      <button type="submit" class="proceed-button">Proceed to Payment</button>
    </form>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default defineComponent({
  name: 'DeliveryDetails',
  setup() {
    const route = useRoute();
    const isLoading = ref(false);
    const formValid = ref(true);

    // Delivery details
    const deliveryDetails = ref({
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    });
    console.log("Delivery Details:", deliveryDetails.value);

    // Cart details
    const productIds = ref<string[]>([]);
    const productDescription = ref<string[]>([]);
    const productName = ref<string[]>([]);
    const quantities = ref<number[]>([]);
    const prices = ref<number[]>([]); // Added individual prices
    const total = ref<number>(0);

    // Retrieve cart data
    onMounted(() => {
      productIds.value = route.query.productId?.toString().split(',') || [];
      productDescription.value = route.query.description?.toString().split(',') || [];
      productName.value = route.query.name?.toString().split(',') || [];
      quantities.value = route.query.quantity?.toString().split(',').map(Number) || [];
      prices.value = route.query.price?.toString().split(',').map(Number) || [];
      total.value = parseFloat(route.query.total as string) || 0;
    });

    // Validate form
    const validateForm = () => {
      console.log("Validating form...");
      formValid.value = true;
      const requiredFields = ['name', 'email', 'address', 'city', 'postalCode', 'country'];
      requiredFields.forEach(field => {
        if (!deliveryDetails.value[field as keyof typeof deliveryDetails.value]) {
          formValid.value = false;
        }
      });
      return formValid.value;
    };

    const proceedToPayment = async () => {
  try {
    // Validate form before proceeding
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return; // Stop if form is invalid
    }

    // Log delivery details before creating payload
    console.log("Delivery Details:", deliveryDetails.value);
    
    // Structure payload EXACTLY as backend expects
    const payload = {
      deliveryDetails: {
        email: deliveryDetails.value.email,
        name: deliveryDetails.value.name, // Optional based on your backend
        address: deliveryDetails.value.address // Optional based on your backend
      },
      product: {
        name: productName.value[0] || "Product Name",
        description: productDescription.value[0] || "Product Description",
        price: total.value || 0 // Must be a number
      },
      productId: productIds.value[0] || "" // Must be string
    };

    // Log the payload before sending it
    console.log("Final payload being sent:", payload);

    const response = await axios.post('https://createcheckoutsession-y65c5f7hba-ew.a.run.app',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      }
    );

    const { sessionId } = response.data;
    console.log("Stripe sessionId:", sessionId);

    const stripe = await loadStripe("pk_live_51R3fhPBSEvZ2sDOOM6NhGzEpEY7okEW0Nz8PzzH4sebQ6zCLQivq5FasGrc1Xx63tn55K5c8xU3Qs3ieiUprvQa900k7yg3eZo");
    await stripe?.redirectToCheckout({ sessionId });

  } catch (error) {
    console.error('Full error:', error);

    // Log specific details about the error
    if (axios.isAxiosError(error)) {
      console.error('Error response:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      // Check if there's an error message in the response data
      alert(`Payment failed: ${error.response?.data?.error || error.message}`);
    } else {
      alert('Payment failed. Please try again.');
    }
  }
};
    return {
      deliveryDetails,
      proceedToPayment,
      isLoading,
      formValid,
    };
  },
});
</script>
<!-- pk_test_51R3fhbPconqYmSJtUhSPMTRDpObA87eZh906O9EqIwl0Kk4EvHNJHOY65QIuTFF2Y8Yxq4e48PVaoqVsevE143qE00hD6vgP1A
https://createcheckoutsession-y65c5f7hba-ew.a.run.app -->
<style scoped>
.error-message {
  color: #ff4444;
  margin-top: 10px;
  text-align: center;
}

.proceed-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.delivery-page {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
}

.delivery-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.proceed-button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.proceed-button:hover {
  background-color: #555;
}
</style>