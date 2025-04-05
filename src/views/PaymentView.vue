<template>
  <div class="payments">
    <Payment 
    pk="pk_live_51R3fhPBSEvZ2sDOOM6NhGzEpEY7okEW0Nz8PzzH4sebQ6zCLQivq5FasGrc1Xx63tn55K5c8xU3Qs3ieiUprvQa900k7yg3eZo"
    :elementsOptions="{ clientSecret: clientSecret }"
    :confirmParams="{ return_url: 'https://yourdomain.com/success' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios';
import Payment from '@/components/Payment.vue';

const clientSecret = ref('');

onMounted(async () => {
  try {
    // Fetch the clientSecret from your backend
    const response = await axios.post('http://localhost:4242/create-payment-intent', {
      amount: 5000, // Amount in cents (e.g., $50.00 = 5000)
      currency: 'usd', // Currency (e.g., 'usd')
    });
    clientSecret.value = response.data.clientSecret;
  } catch (error) {
    console.error('Error fetching clientSecret:', error);
  }
});
</script>

<style>
h1 {
  margin-top: 60px;
}
</style>