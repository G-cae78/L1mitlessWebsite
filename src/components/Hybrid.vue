<template>
  <div class="hybrid-training">
    <h1>Hybrid Training</h1>
    <div class="training-container">
      <div class="training-card">
        <img :src="trainingPlan.image" :alt="trainingPlan.name" class="training-image" />
        <div class="training-details">
          <h2>{{ trainingPlan.name }}</h2>
          <p>{{ trainingPlan.description }}</p>
          <p class="training-goal"><strong>Goal:</strong> {{ trainingPlan.goal }}</p>
          <p class="training-price"><strong>Price:</strong> €{{ trainingPlan.price.toFixed(2) }}</p>
          
          <button @click="addToCart(trainingPlan)" class="add-to-cart-button">Add to Cart</button>
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
  name: 'HybridTraining',
  data() {
    return {
      trainingPlan: {
        productId: "sSslwv3eDQ6RZ0NoaWMx",
        name: 'Sub-20min 5k & Sub-40min 10k Training Plan',
        description:
        `This is the exact hybrid training plan I use to run a sub-20-minute 5K (19:40 PR) and am currently refining for a sub-40-minute 10K (42:00 PB). It blends structured speedwork, endurance building, and strength training to optimize performance while minimizing injury risk. The mix of running and lifting keeps workouts engaging and maximizes overall fitness—no more grinding through monotonous weight sessions or endless slow miles!`,
        image: require('@/assets/Running.png'), // Replace with your image
        goal: 'Achieve a sub-20-minute 5k and train for a sub-40-minute 10k.',
        price: 6.99,  // Example price
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
.hybrid-training {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.training-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.training-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.training-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.training-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.training-details {
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

.training-goal {
  font-size: 1rem;
  color: #333;
  margin-bottom: 15px;
}

.training-price {
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
