<template>
  <div class="merchandise">
    <h1>Strength Training</h1>
    <div class="merch-container">
      <div class="merch-card">
        <img :src="trainingPlan.image" :alt="trainingPlan.name" class="merch-image" />
        <div class="merch-details">
          <h2>{{ trainingPlan.name }}</h2>
          <p>{{ trainingPlan.description }}</p>
          <p class="merch-goal"><strong>Goal:</strong> {{ trainingPlan.goal }}</p>
          <p class="merch-price"><strong>Price:</strong> €{{ trainingPlan.price.toFixed(2) }}</p>
          
          <button @click="addToCart(trainingPlan)" class="add-to-cart-button">Add to Cart</button>
          <!-- <button @click="purchasePlan(trainingPlan)" class="buy-now-button">Buy Now</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { mapMutations } from 'vuex';

const stripePromise = loadStripe('pk_test_51R3fhbPconqYmSJtUhSPMTRDpObA87eZh906O9EqIwl0Kk4EvHNJHOY65QIuTFF2Y8Yxq4e48PVaoqVsevE143qE00hD6vgP1A');

export default defineComponent({
  name: 'StrengthTraining',
  data() {
    return {
      trainingPlan: {
        productId: "cdHdKAPwgFmcnRvtpBc0",
        name: 'Limitless Strength Plan',
        description: "This is the exact strength training plan I’ve followed for the past three years to build muscle and power—without sacrificing athleticism and mobility. Structured around upper/lower splits with strategic rest days, it prioritizes hypertrophy-focused volume while sneaking in just enough cardio to keep conditioning sharp (if you don't like the miles but still want to stay sharp this is perfect.)",
        image: require('@/assets/Muscle.png'),
        goal: 'Build Muscle, Increase Strength, and Boost Confidence',
        price: 6.99,
      },
    };
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    addToCart(item: any) {
      this.ADD_TO_CART({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        selectedSize: item.selectedSize,
        quantity: 1, // Default to 1 when adding a new item
      });
      alert(`${item.name} added to cart!`);
    },
  },
});
</script>

<style scoped>
.merchandise {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.merch-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.merch-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.merch-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.merch-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.merch-details {
  padding: 20px;
  text-align: left;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 15px;
}

.merch-goal {
  font-size: 1rem;
  color: #333;
  margin-bottom: 15px;
}

.merch-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.add-to-cart-button, .buy-now-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover, .buy-now-button:hover {
  background-color: #555;
}
</style>